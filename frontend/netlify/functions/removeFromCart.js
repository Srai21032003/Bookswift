import { neon } from '@neondatabase/serverless';
import { verifyToken } from './verifyToken';

const sql = neon(process.env.DATABASE_URL);

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { book_id } = JSON.parse(event.body);

  // Verify token
  const tokenVerification = verifyToken(event);
  if (!tokenVerification.valid) {
    return {
      statusCode: tokenVerification.statusCode,
      body: JSON.stringify({ message: tokenVerification.message }),
    };
  }

  const { userId } = tokenVerification.decoded;

  try {
    // Find the cart for the user
    const cartQuery = `SELECT cart_id FROM Cart WHERE user_id = $1`;
    const cartResult = await sql(cartQuery, [userId]);

    if (cartResult.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'No active cart found' }),
      };
    }

    const cartId = cartResult[0].cart_id;

    // Remove the book from the CartItems table
    const deleteQuery = `DELETE FROM CartItems WHERE cart_id = $1 AND book_id = $2`;
    await sql(deleteQuery, [cartId, book_id]);

    // Fetch updated cart
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
    console.error('Error removing item from cart:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
}
