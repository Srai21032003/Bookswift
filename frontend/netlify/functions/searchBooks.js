import { neon } from '@neondatabase/serverless';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { query } = JSON.parse(event.body);

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Search query is required' }),
    };
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const searchQuery = `
      SELECT * FROM Books
      WHERE title ILIKE $1 OR author ILIKE $1 OR genre ILIKE $1
    `;

    const results = await sql(searchQuery, [`%${query}%`]);

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (error) {
    console.error('Error searching for books:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
}
