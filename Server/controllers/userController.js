const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// update user info
const updateUserInfo = async (req, res) => {
    // Check if user is authorized to update the user
    if (req.user.id !== req.params.userId) {
        return res.status(403).json({
            message: 'You are not authorized to update this user',
            error: true,
            success: false
        });
    }

    const updates = {};

    // Handle password update
    if (req.body.password) {
        if (req.body.password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long',
                error: true,
                success: false
            });
        }
        updates.password = bcrypt.hashSync(req.body.password, 10);
    }

    // Handle username update
    if (req.body.username) {
        if (req.body.username.length < 5 || req.body.username.length > 20 ||
            req.body.username.includes(' ') || req.body.username !== req.body.username.toLowerCase() ||
            !req.body.username.match(/^[a-z0-9]+$/)) {
            return res.status(400).json({
                message: 'Invalid username',
                error: true,
                success: false
            });
        }
        // Check if username is already taken
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser && existingUser._id.toString() !== req.params.userId) {
            return res.status(400).json({
                message: 'Username is already taken',
                error: true,
                success: false
            });
        }
        updates.username = req.body.username;
    }

    // Handle other fields
    if (req.body.email) updates.email = req.body.email;
    if (req.body.profilePicture) updates.profilePicture = req.body.profilePicture;

    // Update the user
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: updates }, { new: true });
        const { password, ...rest } = updatedUser._doc;
        return res.status(200).json({
            user: rest,
            message: 'User updated successfully',
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
