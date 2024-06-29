const express = require('express');
const { userSignup, userSignin, google, userSignout, ForgotPassword, ResetPassword} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', userSignup);
router.post('/signin', userSignin);
router.post('/google', google);
router.post('/signout', userSignout);
router.post('/forgot-password', ForgotPassword);
router.post('/reset-password/:token', ResetPassword);



module.exports = router;