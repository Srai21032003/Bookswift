// import { neon } from '@neondatabase/serverless';
// import { verifyToken } from './verifyToken';

// const sql = neon(process.env.DATABASE_URL);

// export async function handler(event) {
//   if (event.httpMethod !== 'POST') {
//     return {
//       statusCode: 405,
//       body: JSON.stringify({ message: 'Method Not Allowed' }),
//     };
//   }

//   const { totalAmount, status, book_id, quantities } = JSON.parse(event.body); // Assuming quantities is passed along with book_id

//   // Verify the token
//   const tokenVerification = verifyToken(event);
//   if (!tokenVerification.valid) {
//     return {
//       statusCode: tokenVerification.statusCode,
//       body: JSON.stringify({ message: tokenVerification.message }),
//     };
//   }

//   const { userId } = tokenVerification.decoded;

//   try {
//     // Insert the order into the Orders table first
//     const insertOrderQuery = `
//       INSERT INTO Orders (user_id, total_amount, status)
//       VALUES ($1, $2, $3)
//       RETURNING order_id, order_date;
//     `;
//     const orderResult = await sql(insertOrderQuery, [userId, totalAmount, status]);
//     const newOrder = orderResult[0];

//     // Prepare to insert multiple order items
//     const orderDetails = [];

//     // Insert entries into OrderItems table for each book
//     for (let i = 0; i < book_id.length; i++) {
//       const id = book_id[i];
//       const quantity = quantities[i]; // Get the quantity for each book

//       const insertOrderItemQuery = `
//         INSERT INTO OrderItems (order_id, book_id, quantity)
//         VALUES ($1, $2, $3);
//       `;
//       await sql(insertOrderItemQuery, [newOrder.order_id, id, quantity]);

//       // Push order detail into the array
//       orderDetails.push({
//         order_id: newOrder.order_id,
//         order_date: newOrder.order_date,
//         book_id: id,
//         quantity: quantity,
//         status: "Pending"
//       });
//     }

//     // Insert entry into Orders_History table
//     const insertHistoryQuery = `
//       INSERT INTO Orders_History (order_id, user_id, order_date, total_amount, status)
//       VALUES ($1, $2, $3, $4, $5);
//     `;
//     await sql(insertHistoryQuery, [newOrder.order_id, userId, newOrder.order_date, totalAmount, status]);

//     // Clear the user's cart after order confirmation
//     const clearCartItemsQuery = `
//       DELETE FROM CartItems
//       WHERE cart_id = (SELECT cart_id FROM Cart WHERE user_id = $1);
//     `;
//     await sql(clearCartItemsQuery, [userId]);

//     // Now delete the user's cart
//     // const clearCartQuery = `
//     //   DELETE FROM Cart
//     //   WHERE user_id = $1;
//     // `;
//     // await sql(clearCartQuery, [userId]);

//     // Return all order details
//     return {
//       statusCode: 200,
//       body: JSON.stringify(orderDetails), // Return an array of order details
//     };
//   } catch (error) {
//     console.error('Error inserting order:', error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: 'Internal Server Error' }),
//     };
//   }
// }

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

  // Parse the incoming request body
  const { totalAmount, status, book_ids, quantities } = JSON.parse(event.body); // book_ids renamed for consistency

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
    // Insert the order into the Orders table first
    const insertOrderQuery = `
      INSERT INTO Orders (user_id, total_amount, status)
      VALUES ($1, $2, $3)
      RETURNING order_id, order_date;
    `;
    const orderResult = await sql(insertOrderQuery, [userId, totalAmount, status]);
    const newOrder = orderResult[0];

    // Prepare to insert multiple order items
    const orderDetails = [];

    // Insert entries into OrderItems table for each book
    for (let i = 0; i < book_ids.length; i++) {
      const id = book_ids[i];
      const quantity = quantities[i]; // Get the quantity for each book

      const insertOrderItemQuery = `
        INSERT INTO OrderItems (order_id, book_id, quantity)
        VALUES ($1, $2, $3);
      `;
      await sql(insertOrderItemQuery, [newOrder.order_id, id, quantity]);

      // Push order detail into the array
      orderDetails.push({
        order_id: newOrder.order_id,
        order_date: newOrder.order_date,
        book_id: id,
        quantity: quantity,
        status: "Pending"
      });
    }

    // Insert entry into Orders_History table
    const insertHistoryQuery = `
      INSERT INTO Orders_History (order_id, user_id, order_date, total_amount, status)
      VALUES ($1, $2, $3, $4, $5);
    `;
    await sql(insertHistoryQuery, [newOrder.order_id, userId, newOrder.order_date, totalAmount, status]);

    // Clear the user's cart after order confirmation
    const clearCartItemsQuery = `
      DELETE FROM CartItems
      WHERE cart_id = (SELECT cart_id FROM Cart WHERE user_id = $1);
    `;
    await sql(clearCartItemsQuery, [userId]);

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
