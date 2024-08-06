const jwt = require('jsonwebtoken');


// Middleware to verify user
const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({
            message: 'Access denied',
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
            message: 'Invalid token',
            error: true,
            success: false,
        });
    }
};

module.exports = verifyUser;