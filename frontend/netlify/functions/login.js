// login.js
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secret-key';

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Email and password are required' }),
        };
    }

    const sql = neon(process.env.DATABASE_URL);

    try {
        const userQuery = `SELECT * FROM Users WHERE email = $1`;
        const userResult = await sql(userQuery, [email]);

        if (userResult.length === 0) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Invalid email or password' }),
            };
        }

        const user = userResult[0];

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Invalid email or password' }),
            };
        }
        
        // Generate a token (JWT) with userId and username
        const token = jwt.sign({ userId: user.user_id, username: user.username, userType: user.type }, JWT_SECRET, {
            expiresIn: '7d',
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Login successful', token, userType: user.type }), // Include userType here
        };
    } catch (error) {
        console.error('Error during login:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
}
