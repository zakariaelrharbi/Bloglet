const express = require('express');

const router = express.Router();


router.put('/update:userId', updateUserInfo);

module.exports = router;