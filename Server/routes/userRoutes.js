const express = require('express');
const { updateUserInfo } = require('../controllers/userController');
const verifyUser  = require('../middleware/verifyUser');
const router = express.Router();


router.put('/update/:userId', verifyUser, updateUserInfo);

module.exports = router;