import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function handler(event) {
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const bookId = event.queryStringParameters.book_id; // Get book_id from the URL query parameters

    try {
        // Query to fetch book details from the Books table
        const bookQuery = `SELECT title, author, publisher, genre, description, cover_img_url 
                           FROM Books WHERE book_id = $1`;
        const bookResult = await sql(bookQuery, [bookId]);

        if (bookResult.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Book not found' }),
            };
        }

        const book = bookResult[0];

        // Query to fetch price and quantity from the Inventory table
        const inventoryQuery = `SELECT price, quantity 
                                FROM Inventory WHERE book_id = $1`;
        const inventoryResult = await sql(inventoryQuery, [bookId]);

        if (inventoryResult.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Inventory details not found' }),
            };
        }

        const inventory = inventoryResult[0];

        // Combine book details and inventory details
        const bookDetails = {
            ...book,
            price: inventory.price,
            quantity: inventory.quantity,
        };

        return {
            statusCode: 200,
            body: JSON.stringify(bookDetails),
        };
    } catch (error) {
        console.error('Error fetching book details:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
}
