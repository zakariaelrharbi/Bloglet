const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const errorHandler = require('../utils/error');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));    
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });        
    } catch (error) {
        next(error);
    }
};

// Signin

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const ValidUser = await User.findOne({ email });
        if (!ValidUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const ValidPassword = bcrypt.compareSync(password, ValidUser.password);
        if (!ValidPassword) {
            return next(errorHandler(401, 'Invalid Password'));
        }

        const token = jwt.sign({ id: ValidUser._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        const { password: userPassword, ...rest } = ValidUser._doc;

        res.status(200)
           .cookie('access_token', token, { httpOnly: true })
           .json({ message: 'User signed in successfully', rest});

    } catch (error) {
        next(error);
    }
};

module.exports = { signup, signin };
