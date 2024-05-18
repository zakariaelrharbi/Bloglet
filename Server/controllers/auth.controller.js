const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const errorHandler = require('../utils/error');



const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password ||
        username === '' || email === '' || password === '' )
    {
        next(errorHandler(400, 'All fields are required'));    
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword});
    try {
        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });        
    } catch (error) {
        next(error);
    }
};

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const ValidUser = await User.findOne({ email });
        if (!ValidUser) {
            next(errorHandler(404, 'User not found'));
        }
        const ValidPassword = bcrypt.compareSync(password, ValidUser.password);
        if (!ValidPassword) {
            next(errorHandler(401, 'Invalid credentials'));
        }
        res.status(200).json({ message: 'User signed in successfully' });

        
    } catch (error) {
        next(error);
    }
};




module.exports = { signup, signin };