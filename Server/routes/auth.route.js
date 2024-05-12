const express = require('express');
const { signup } = require('../controllers/auth.controller');

const router = express.Router();

// Define routes
router.post('/signup', signup);

module.exports = router;
