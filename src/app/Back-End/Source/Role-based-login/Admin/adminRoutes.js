const express = require('express');
const adminController = require('./adminController');

const router = express.Router();

// Route for creating a recruiter
router.post('/api/register/admin', adminController.createAdminController);


module.exports = router;
