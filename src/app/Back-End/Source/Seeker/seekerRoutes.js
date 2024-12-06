const express = require('express');
const seekerController = require('./seekerController');

const router = express.Router();

// Route for creating a recruiter
router.post('/api/register/seeker',seekerController.createSeekerController);

// Validation Routes
router.post('/api/register/seeker/check-fullname', seekerController.checkSeekerFullName);
router.post('/api/register/seeker/check-username', seekerController.checkSeekerUsername);
router.post('/api/register/seeker/check-email', seekerController.checkSeekerEmail);

module.exports = router;
