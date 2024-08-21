const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();


const userSignup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({
            message: 'All fields are required',
            error: true,
            success: false,
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(200).json({
            message: 'User created successfully',
            error: false,
            success: true,
        });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            if (error.keyPattern && error.keyPattern.username) {
                return res.status(400).json({
                    message: 'Username already exists',
                    error: true,
                    success: false,
                    field: 'username'
                });
            } else if (error.keyPattern && error.keyPattern.email) {
                return res.status(400).json({
                    message: 'Email already exists',
                    error: true,
                    success: false,
                    field: 'email'
                });
            }
        }
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
};


// Sign In function
const userSignin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'All fields are required',
            error: true,
            success: false,
        });
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(400).json({
                message: 'Email not found',
                error: true,
                success: false,
            });
        }

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            return res.status(400).json({
                message: 'Invalid password',
                error: true,
                success: false,
            });
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const { password: userPassword, ...rest } = validUser._doc;
        return res.status(200)
            .cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', })
            .json({
                user: rest,
                message: 'Signin successful',
                error: false,
                success: true,
            });

    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: true,
            success: false,
        });
    }
};

// Google Sign In function
const google = async (req, res) => {
    const { name, email, googlePhotoURL } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            return res.status(200)
                .cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
                .json({
                    user: rest,
                    message: 'Signin successful',
                    error: false,
                    success: true,
                });
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            const newUser = new User({
                username: 
                name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoURL,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            return res.status(200)
                .cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
                .json({
                    user: rest,
                    message: 'Signin successful',
                    error: false,
                    success: true,
                });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: true,
            success: false,
        });
    }
};

// signout function
const userSignout = (req, res) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json({
        message: 'Signout successful',
        error: false,
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: true,
      success: false,
    });
  }
};

// Forgot Password function
const ForgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
                error: true,
                success: false,
            });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour before the token expires
        user.resetLink = token;
        user.resetTokenExpiry = new Date(resetTokenExpiry);
        await user.save();

        // Send email to user
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset Link',
            html: `
                <h1>Please click on the link below to reset your password</h1>
                <p>${process.env.FRONTEND_URL}/reset-password/${token}</p>
            `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({
                    message: 'error sending email',
                    error: true,
                    success: false,
                });
            }
            return res.status(200).json({
                message: 'Email sent successfully',
                error: false,
                success: true,
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: true,
            success: false,
        });
    }
    
};

// Reset Password function
const ResetPassword = async (req, res) => {
    const { token } = req.params; // Extract token from params
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetLink: token,
            resetTokenExpiry: { $gt: Date.now() }, // Ensure token is not expired
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired token',
                error: true,
                success: false,
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetLink = ''; // Clear the reset link
        user.resetTokenExpiry = null; // Clear the token expiry

        // Save the updated user
        await user.save();

        return res.status(200).json({
            message: 'Password reset successful',
            error: false,
            success: true,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: true,
            success: false,
        });
    }
};



module.exports = { userSignup, userSignin, google, userSignout, ForgotPassword, ResetPassword };
