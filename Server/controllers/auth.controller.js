const User = require('../models/user.model');
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password ||
        username === '' || email === '' || password === '' )
    {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newUser = new User({ username, email, password });

    await newUser.save();
    res.status(200).json({ message: 'User created successfully' });
};


module.exports = { signup };