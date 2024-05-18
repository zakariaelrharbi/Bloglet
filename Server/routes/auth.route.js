const express = require('express');
const { signup } = require('../controllers/auth.controller');
const { signin } = require('../controllers/auth.controller');

const router = express.Router();

// Define routes
router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
