import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

// Helper function to generate a unique user ID
function generateUserId() {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}

// Helper function to generate a unique bookstore ID
function generateBookstoreId() {
  return 'bks_' + Math.random().toString(36).substr(2, 9);
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { name, email, password, phone, userType, storeName, address } = JSON.parse(event.body);

  if (!name || !email || !password || !phone || !userType) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'All fields are required' }),
    };
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Start a transaction
    await sql('BEGIN');

    // Check if the username or email already exists in the Users table
    const checkUserQuery = `
      SELECT * FROM Users WHERE username = $1 OR email = $2
    `;
    const checkUserResult = await sql(checkUserQuery, [name, email]);

    if (checkUserResult.length > 0) {
      const existingUser = checkUserResult[0];

      let conflictField = '';
      if (existingUser.username === name) {
        conflictField = 'username';
      } else if (existingUser.email === email) {
        conflictField = 'email';
      }

      return {
        statusCode: 409,
        body: JSON.stringify({
          message: `${conflictField.charAt(0).toUpperCase() + conflictField.slice(1)} already exists. Please try another one.`,
        }),
      };
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10); // 10 is the salt rounds, higher means more secure but slower

    let userId;

    if (userType.toLowerCase() === 'customer') {
      // For customers, generate a user ID
      userId = generateUserId();

      // Insert into Users table
      const insertUserQuery = `
        INSERT INTO Users (user_id, username, email, password_hash, type)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await sql(insertUserQuery, [userId, name, email, passwordHash, userType]);

      // Insert into Customer table
      const insertCustomerQuery = `
        INSERT INTO Customer (cust_id, contact_no, firstname, lastname, address)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await sql(insertCustomerQuery, [userId, phone, name, '', '']);
    } else if (userType.toLowerCase() === 'bookowner') {
      // For bookowners, generate a bookstore ID and use it as the user ID and bookstore ID
      const bookstoreId = generateBookstoreId();
      userId = bookstoreId; // Use bookstoreId as userId

      // Insert into Users table
      const insertUserQuery = `
        INSERT INTO Users (user_id, username, email, password_hash, type)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await sql(insertUserQuery, [userId, name, email, passwordHash, userType]);

      // Insert into Bookstore table
      const insertBookstoreQuery = `
        INSERT INTO Bookstore (bks_id, store_name, contact_no, store_address)
        VALUES ($1, $2, $3, $4)
      `;
      await sql(insertBookstoreQuery, [userId, storeName, phone, address]);
    }

    // Commit the transaction
    await sql('COMMIT');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User registered successfully' }),
    };
  } catch (error) {
    // Rollback the transaction in case of error
    await sql('ROLLBACK');
    console.error('Error registering user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
}
