const express = require('express');
const { test } = require('../controllers/user.controller');

const router = express.Router();

// Define routes
router.get('/test', test);

module.exports = router;