const express = require('express');
const recruiterController = require('./recruiterController');

const router = express.Router();

// Route for creating a Recruiter
router.post('/api/register/recruiter', recruiterController.createRecruiterController);

// Validation Routes
router.post('/api/register/recruiter/check-username', recruiterController.checkRecruiterUsername);
router.post('/api/register/recruiter/check-email', recruiterController.checkRecruiterEmail);

// CRUD Routes
router.get('/api/recruiters', recruiterController.getAllRecruitersController);
router.get('/api/recruiter/:id', recruiterController.getRecruiterByIdController);
router.put('/api/recruiter/:id', recruiterController.updateRecruiterController);
router.delete('/api/recruiter/:id', recruiterController.deleteRecruiterController);

module.exports = router;
