// const { Pool } = require('@neondatabase/serverless');

// const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// exports.handler = async (event) => {
//   const { cartId } = JSON.parse(event.body);  // Now we fetch inventory based on the cartId

//   try {
//     const client = await pool.connect();

//     // Query to get the book details based on the books in the user's cart
//     const query = `
//       SELECT 
//         ci.book_id, 
//         i.price, 
//         i.quantity AS availableQuantity 
//       FROM 
//         CartItems ci
//       JOIN 
//         Inventory i ON ci.book_id = i.book_id
//       WHERE 
//         ci.cart_id = $1
//     `;

//     const result = await client.query(query, [cartId]);  // Fetch inventory details for the given cart ID
//     client.release();

//     // Structure the response to include price, available quantity, and default quantity of 1
//     const data = result.rows.reduce((acc, row) => {
//       acc[row.book_id] = {
//         price: row.price,
//         availableQuantity: row.availablequantity, // Correctly get the available quantity
//         quantity: 1, // Default to 1 as initial quantity
//       };
//       return acc;
//     }, {});

//     return {
//       statusCode: 200,
//       body: JSON.stringify(data),
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: 'Error fetching inventory details' }),
//     };
//   }
// };

const { Pool } = require('pg'); // Use 'pg' for HTTP connections

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use HTTP-based connection pooling
  ssl: { rejectUnauthorized: false }, // Enable SSL
});

exports.handler = async (event) => {
  const { bookIds } = JSON.parse(event.body);

  try {
    const client = await pool.connect();
    const query = `
      SELECT book_id, price, quantity AS availableQuantity 
      FROM Inventory 
      WHERE book_id = ANY($1)
    `;
    const result = await client.query(query, [bookIds]);
    client.release();

    const data = result.rows.reduce((acc, row) => {
      acc[row.book_id] = {
        price: row.price,
        availableQuantity: row.availableQuantity, // Use the correct casing
        quantity: 1, // Default to 1 as initial quantity
      };
      return acc;
    }, {});

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching inventory details' }),
    };
  }
};
