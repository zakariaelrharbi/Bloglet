const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function(value) {
                // Minimum 8 characters, at least one uppercase letter
                return /^(?=.*[A-Z]).{8,}$/.test(value);
            },
            message: 'Password must be at least 8 characters long and contain at least one uppercase letter'
        }
    },
    profilePicture: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    resetLink: {
        type: String,
        default: '',
    },
    resetTokenExpiry: {
        type: Date,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
