const express = require('express');
const recruiterController = require('./recruiterController');

const router = express.Router();

// Route for creating a recruiter
router.post('/api/register/recruiter', recruiterController.createRecruiterController);

// Validation Routes
router.post('/api/register/recruiter/check-fullname', recruiterController.checkRecruiterFullName);
router.post('/api/register/recruiter/check-username', recruiterController.checkRecruiterUsername);
router.post('/api/register/recruiter/check-email', recruiterController.checkRecruiterEmail);

module.exports = router;
