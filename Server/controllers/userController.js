const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// update user info
const updateUserInfo = async (req, res) => {
    // Check if the user is authorized to update
    if (req.user.id !== req.params.userId) {
        return res.status(403).json({
            message: 'You are not authorized to update this user',
            error: true,
            success: false
        });
    }

    // Check and hash the password if provided
    if (req.body.password) {
        if (req.body.password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long',
                error: true,
                success: false
            });
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    // Check the username if provided
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return res.status(400).json({
                message: 'Username must be between 7 and 20 characters long',
                error: true,
                success: false
            });
        }
        if (req.body.username.includes(' ')) {
            return res.status(400).json({
                message: 'Username cannot contain spaces',
                error: true,
                success: false
            });
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return res.status(400).json({
                message: 'Username must be lowercase',
                error: true,
                success: false
            });
        }
        if (!req.body.username.match(/^[a-z0-9]+$/)) {
            return res.status(400).json({
                message: 'Username must contain only letters and numbers',
                error: true,
                success: false
            });
        }
    }

    // Update the user
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );
        
        // Exclude the password from the response
        const { password, ...rest } = updatedUser._doc;
        return res.status(200).json({
            user: rest,
            message: 'info updated successfully',
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
};

module.exports = { updateUserInfo };
