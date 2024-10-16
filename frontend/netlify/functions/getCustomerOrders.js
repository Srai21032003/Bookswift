import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function handler(event) {
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const userId = event.queryStringParameters.user_id; // Get user_id from query params
    console.log('User ID:', userId);

    try {
        // Query to fetch customer orders from the Orders and OrderItems tables
        const ordersQuery = `
            SELECT o.order_id, o.order_date, o.total_amount, o.status, 
                   ARRAY_AGG(JSON_BUILD_OBJECT('title', b.title, 'quantity', oi.quantity, 'cover_img_url', b.cover_img_url)) AS items
            FROM Orders o
            JOIN OrderItems oi ON o.order_id = oi.order_id
            JOIN Books b ON oi.book_id = b.book_id
            WHERE o.user_id = $1
            GROUP BY o.order_id;
        `;
        const ordersResult = await sql(ordersQuery, [userId]);

        if (ordersResult.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No orders found for this user.' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(ordersResult),
        };
    } catch (error) {
        console.error('Error fetching customer orders:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
}
