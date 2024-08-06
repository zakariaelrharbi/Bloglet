const User = require('../models/userModel');



// update user info
const updateUserInfo = async (req, res) => {
    const { userId } = req.params;
    const { username, email, password, profilePicture } = req.body;

    try {
        const user = await User.findById(userId);
    } catch (error) {
    }
}