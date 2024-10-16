import { neon } from '@neondatabase/serverless';
import { verifyToken } from './verifyToken'; // Import the token verification middleware

export async function handler(event) {
    // Validate the token
    const tokenVerification = verifyToken(event);

    if (!tokenVerification.valid) {
        console.error('Token verification failed:', tokenVerification.message); // Log verification errors
        return {
            statusCode: tokenVerification.statusCode,
            body: JSON.stringify({ message: tokenVerification.message }),
        };
    }

    const { userId } = tokenVerification.decoded; // Extract userId from the verified token

    try {
        const sql = neon(process.env.DATABASE_URL);
        // Select both username and userType (type) from the Users table
        const query = 'SELECT user_id,username, type FROM Users WHERE user_id = $1';
        const result = await sql(query, [userId]);

        if (result.length === 0) {
            console.error('User not found for userId:', userId); // Log if user not found
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' }),
            };
        }

        // Return both username and userType
        return {
            statusCode: 200,
            body: JSON.stringify({ username: result[0].username, userType: result[0].type, userId: result[0].user_id }),
        };
    } catch (error) {
        console.error('Error fetching user data:', error); // Log any errors during DB fetch
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
}
