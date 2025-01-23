import jwt from 'jsonwebtoken';
import { findUserById } from '../services/user.services.js';
import { findCaptainById } from '../services/captain.services.js';
import dotenv from 'dotenv';
dotenv.config();
import { isBlackListed } from '../services/auth.services.js';

// Middleware function to authenticate users by verifying JWT
export const Authenticate = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null); // "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'Authorization token is missing' });
    }

    const blackListed = await isBlackListed(token);
    if (blackListed) {
        return res.status(401).json({ error: 'You are not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token

        const user = await findUserById(decoded._id); // Fetch user from the DB based on decoded token ID
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;  // Attach the user to the request object
        
        return next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Middleware function to authenticate users by verifying JWT
export const CaptainAuthenticate = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null); // "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'Authorization token is missing' });
    }

    const blackListed = await isBlackListed(token);
    if (blackListed) {
        return res.status(401).json({ error: 'You are not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token

        const captain = await findCaptainById(decoded._id); // Fetch captain from the DB based on decoded token ID
        if (!captain) {
            return res.status(401).json({ error: 'Captain not found' });
        }

        req.captain = captain;  // Attach the captain to the request object

        return next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}