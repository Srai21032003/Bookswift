import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';
import { verifyToken } from './verifyToken'; // Your existing token verification function

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secret-key';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { book_id } = JSON.parse(event.body);
  
  // Verify the token
  const tokenVerification = verifyToken(event);
  if (!tokenVerification.valid) {
    return {
      statusCode: tokenVerification.statusCode,
      body: JSON.stringify({ message: tokenVerification.message }),
    };
  }

  const { userId } = tokenVerification.decoded;

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Check if the user has an active cart
    const cartQuery = `SELECT cart_id FROM Cart WHERE user_id = $1`;
    let cartResult = await sql(cartQuery, [userId]);

    let cartId;
    if (cartResult.length === 0) {
      // No cart exists, create a new cart for the user
      const createCartQuery = `INSERT INTO Cart (user_id) VALUES ($1) RETURNING cart_id`;
      const newCart = await sql(createCartQuery, [userId]);
      cartId = newCart[0].cart_id;
    } else {
      cartId = cartResult[0].cart_id;
    }

    // Check if the book already exists in the cart
    const itemQuery = `SELECT * FROM CartItems WHERE cart_id = $1 AND book_id = $2`;
    const itemResult = await sql(itemQuery, [cartId, book_id]);

    if (itemResult.length > 0) {
      // If the book already exists, update the quantity
      const updateQuery = `UPDATE CartItems SET quantity = quantity + 1 WHERE cart_id = $1 AND book_id = $2`;
      await sql(updateQuery, [cartId, book_id]);
    } else {
      // If the book does not exist in the cart, add it to the cart
      const insertItemQuery = `INSERT INTO CartItems (cart_id, book_id, quantity) VALUES ($1, $2, 1)`;
      await sql(insertItemQuery, [cartId, book_id]);
    }

    // Fetch the updated cart items to send back to the client
    const updatedCartQuery = `
      SELECT ci.cart_item_id, ci.cart_id, ci.book_id, ci.quantity, b.title, b.cover_img_url 
      FROM CartItems ci 
      JOIN Books b ON ci.book_id = b.book_id 
      WHERE ci.cart_id = $1`;
    const updatedCart = await sql(updatedCartQuery, [cartId]);

    return {
      statusCode: 200,
      body: JSON.stringify(updatedCart),
    };
  } catch (error) {
    console.error('Error adding book to cart:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
}
