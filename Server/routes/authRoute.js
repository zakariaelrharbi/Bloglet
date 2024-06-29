const express = require('express');
const { signup } = require('../controllers/authController');
const { signin } = require('../controllers/authController');

const router = express.Router();

// Define routes
router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
