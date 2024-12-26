const express = require('express');
const SeekerController = require('./seekerController');

const router = express.Router();

// Route for creating a Seeker
router.post('/api/register/seeker', SeekerController.createSeekerController);

// Validation Routes
router.post('/api/register/seeker/check-fullname', SeekerController.checkSeekerFullName);
router.post('/api/register/seeker/check-username', SeekerController.checkSeekerUsername);
router.post('/api/register/seeker/check-email', SeekerController.checkSeekerEmail);

module.exports = router;
