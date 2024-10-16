// import { neon } from '@neondatabase/serverless';

// const sql = neon(process.env.DATABASE_URL);

// export async function handler(event) {
//     if (event.httpMethod !== 'POST') {
//         return {
//             statusCode: 405,
//             body: JSON.stringify({ message: 'Method Not Allowed' }),
//         };
//     }

//     let body;
//     try {
//         body = JSON.parse(event.body);
//     } catch (error) {
//         return {
//             statusCode: 400,
//             body: JSON.stringify({ message: 'Invalid JSON' }),
//         };
//     }

//     const { orderId, status } = body;

//     try {
//         // Update the order status in the Orders table
//         const updateQuery = `
//             UPDATE Orders
//             SET status = $1
//             WHERE order_id = $2
//         `;
//         await sql(updateQuery, [status, orderId]);

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ success: true }),
//         };
//     } catch (error) {
//         console.error('Error updating order status:', error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ success: false, message: 'Internal Server Error' }),
//         };
//     }
// }
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    let body;
    try {
        body = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid JSON' }),
        };
    }

    const { orderId, status, userId } = body;

    try {
        // Update the order status in the Orders table
        const updateOrderQuery = `
            UPDATE Orders
            SET status = $1
            WHERE order_id = $2
        `;
        await sql(updateOrderQuery, [status, orderId]);

        // Log the update for Orders
        console.log(`Order ${orderId} status updated to ${status} in Orders table`);

        // Update the order status in the Orders_History table
        const updateHistoryQuery = `
            UPDATE Orders_History
            SET status = $1
            WHERE order_id = $2 AND user_id = $3
        `;
        const result = await sql(updateHistoryQuery, [status, orderId, userId]);

        // Check how many rows were affected
        console.log(`Rows affected in Orders_History: ${result.rowCount}`);

        if (result.rowCount === 0) {
            console.warn(`No matching records found in Orders_History for order_id: ${orderId} and user_id: ${userId}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error('Error updating order status:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Internal Server Error' }),
        };
    }
}
