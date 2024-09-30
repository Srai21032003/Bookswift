import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

// Helper function to generate a unique user ID
function generateUserId() {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { name, email, password, phone, userType } = JSON.parse(event.body);

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

    // Generate a unique user ID
    const userId = generateUserId();

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10); // 10 is the salt rounds, higher means more secure but slower

    // Insert into Users table
    const insertUserQuery = `
      INSERT INTO Users (user_id, username, email, password_hash, type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING user_id
    `;
    await sql(insertUserQuery, [userId, name, email, passwordHash, userType]);

    // Insert into Customer or Admin table based on userType
    if (userType.toLowerCase() === 'customer') {
      const insertCustomerQuery = `
        INSERT INTO Customer (cust_id, contact_no, firstname, lastname, address)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await sql(insertCustomerQuery, [userId, phone, name, '', '']);
    } else if (userType.toLowerCase() === 'admin') {
      const insertAdminQuery = `
        INSERT INTO Admin (admin_id, role, permissions, last_login)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      `;
      await sql(insertAdminQuery, [userId, 'default_role', 'default_permissions']);
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
