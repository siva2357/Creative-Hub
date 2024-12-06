const express = require('express');
const { loginController } = require('./loginController');
const router = express.Router();

router.post('/api/login/user', loginController);

module.exports = router;
