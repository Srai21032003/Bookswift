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

  const { totalAmount, status, book_id } = JSON.parse(event.body);

  // Verify the token
  const tokenVerification = verifyToken(event);
  if (!tokenVerification.valid) {
    return {
      statusCode: tokenVerification.statusCode,
      body: JSON.stringify({ message: tokenVerification.message }),
    };
  }

  const { userId } = tokenVerification.decoded;

  try {
    const orderDetails = [];

    for (const id of book_id) {
      const insertOrderQuery = `
        INSERT INTO Orders (user_id, total_amount, status, book_id)
        VALUES ($1, $2, $3, $4)
        RETURNING order_id, order_date;
      `;
      const result = await sql(insertOrderQuery, [userId, totalAmount, status, id]);
      const newOrder = result[0];

      // Push each order detail into the array
      orderDetails.push({
        order_id: newOrder.order_id,
        order_date: newOrder.order_date,
        status: "Pending"
      });

      // Insert entry into Orders_History table
      const insertHistoryQuery = `
        INSERT INTO Orders_History (order_id, user_id, order_date, total_amount, status)
        VALUES ($1, $2, $3, $4, $5);
      `;
      await sql(insertHistoryQuery, [newOrder.order_id, userId, newOrder.order_date, totalAmount, status]);
    }

    // Return all order details
    return {
      statusCode: 200,
      body: JSON.stringify(orderDetails), // Return an array of order details
    };
  } catch (error) {
    console.error('Error inserting order:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
}
