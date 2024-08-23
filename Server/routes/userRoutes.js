const express = require('express');
const { updateUserInfo } = require('../controllers/userController');
const verifyUser  = require('../middleware/verifyUser');
const router = express.Router();


router.put('/update/:userId', verifyUser, updateUserInfo);
router.delete('/delete/:userId', verifyUser, deleteUser);

module.exports = router;