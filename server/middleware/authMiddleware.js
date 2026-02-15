const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * JWT Authentication Middleware
 *
 * Reads the Authorization header, extracts the Bearer token,
 * verifies it, and attaches the user to the request object.
 * Returns 401 if token is missing or invalid.
 */
const authMiddleware = async (req, res, next) => {
    let token;

    // Check for Bearer token in Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract token from "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to request (exclude password)
            req.user = await User.findById(decoded.id).select('-password');

            return next();
        } catch (error) {
            res.status(401).json({ message: 'Access denied. Please login.' });
            return;
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Access denied. Please login.' });
        return;
    }
};

module.exports = authMiddleware;
