const { Client } = require('pg'); // Assuming you are using pg for PostgreSQL

exports.handler = async (event) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    await client.connect();

    const { shop_id } = event.queryStringParameters;

    try {
        const res = await client.query(`
            SELECT inv.inventory_id, b.title AS book_name, inv.price, inv.quantity, b.cover_img_url AS img_url
            FROM Inventory inv
            JOIN Books b ON inv.book_id = b.book_id
            WHERE inv.shop_id = $1
        `, [shop_id]);

        await client.end();
        return {
            statusCode: 200,
            body: JSON.stringify(res.rows),
        };
    } catch (error) {
        await client.end();
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching inventory', error }),
        };
    }
};
