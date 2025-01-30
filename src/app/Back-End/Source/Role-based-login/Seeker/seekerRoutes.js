const express = require('express');
const SeekerController = require('./seekerController');

const router = express.Router();

// Route for creating a Seeker
router.post('/api/register/seeker', SeekerController.createSeekerController);

// Validation Routes
router.post('/api/register/seeker/check-username', SeekerController.checkSeekerUsername);
router.post('/api/register/seeker/check-email', SeekerController.checkSeekerEmail);

// CRUD Routes
router.get('/api/seekers', SeekerController.getAllSeekersController);
router.get('/api/seeker/:id', SeekerController.getSeekerByIdController);
router.put('/api/seeker/:id', SeekerController.updateSeekerController);
router.delete('/api/seeker/:id', SeekerController.deleteSeekerController);

module.exports = router;
