const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify user
const verifyUser = (req, res, next) => {

    const token = req.cookies.access_token;  // Ensure this is correctly set
    if (!token) {
        return res.status(401).json({
            message: 'Access denied. No token provided.',
            error: true,
            success: false,
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid token.',
            error: true,
            success: false,
        });
    }
};

module.exports = verifyUser;
