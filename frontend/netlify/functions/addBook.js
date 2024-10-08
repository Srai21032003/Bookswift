import { neon } from '@neondatabase/serverless';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const {
    shopId,
    bookName,
    authorName,
    price,
    quantity,
    genre,
    publisher,
    description,
    img_url,
  } = JSON.parse(event.body);

  // Validate required fields
  if (!shopId || !bookName || !authorName || price == null || quantity == null || !genre || !publisher) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'All fields are required' }),
    };
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Start a transaction
    await sql('BEGIN');

    // Insert the new book into the Books table
    const insertBookQuery = `
      INSERT INTO Books (title, author, publisher, genre, description, cover_img_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING book_id;
    `;
    const bookResult = await sql(insertBookQuery, [bookName, authorName, publisher, genre, description, img_url]);
    const newBookId = bookResult[0].book_id; // Extract the book ID from the result

    // Insert the new inventory item into the Inventory table
    const insertInventoryQuery = `
      INSERT INTO Inventory (shop_id, book_id, quantity, price)
      VALUES ($1, $2, $3, $4);
    `;
    await sql(insertInventoryQuery, [shopId, newBookId, quantity, price]);

    // Commit the transaction
    await sql('COMMIT');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Book added successfully!' }),
    };
  } catch (error) {
    // Rollback the transaction in case of error
    await sql('ROLLBACK');
    console.error('Error adding book:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
}
