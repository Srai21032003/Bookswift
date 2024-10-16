import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secret-key'; // Ensure your JWT secret is set in Netlify env

export const verifyToken = (event) => {
    const token = event.headers.Authorization || event.headers.authorization || '';

    console.log('Token received:', token); // Log the token
    console.log(JWT_SECRET);  // Before both signing and verifying the token


    if (!token) {
        return { valid: false, message: 'No token provided', statusCode: 401 };
    }

    try {
        const verifiedToken = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET); // Remove 'Bearer ' prefix
        return { valid: true, decoded: verifiedToken };
    } catch (error) {
        console.error('Token verification error:', error); // Log the error for debugging
        return { valid: false, message: 'Token verification failed', statusCode: 401 };
    }
};

