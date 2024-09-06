const { Pool } = require('pg');

// PostgreSQL connection setup
const pool = new Pool({
    user: 'postgres',        // Replace with your PostgreSQL username
    host: 'localhost',       // Replace with your PostgreSQL host
    database: 'bookswift',   // Replace with your PostgreSQL database name
    password: '#Tanu40048',  // Replace with your PostgreSQL password
    port: 5432,              // Default PostgreSQL port
});

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log('Connection successful, server time is:', result.rows[0].now);
        pool.end();  // Close the pool after the test
    });
});
