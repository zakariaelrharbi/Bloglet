const User = require('../models/user.model');
const bcrypt = require('bcrypt');



const signup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password ||
        username === '' || email === '' || password === '' )
    {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword});
    try {
        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { signup };