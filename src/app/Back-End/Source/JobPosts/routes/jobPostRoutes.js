const express = require('express');
const router = express.Router();
const jobPostController = require('../controllers/jobPostController');

// Recruiter routes
router.post('/api/job-posts/job', jobPostController.createJobPost);
router.get('/api/job-posts/jobs', jobPostController.getAllJobPosts);
router.get('/api/job-posts/job/:id', jobPostController.getJobPostById); // Get job post by MongoDB _id
router.put('/api/job-posts/job/:id', jobPostController.updateJobPost); // Update by MongoDB _id
router.delete('/api/job-posts/job/:id/delete', jobPostController.deleteJobPost); // Delete by MongoDB _id

router.put('/api/job-posts/job/:id/close', jobPostController.closeJobPost); // Close job by ID
router.get('/api/job-posts/jobs/closed', jobPostController.getClosedJobPosts); // Get all closed jobs
router.put('/api/job-posts/job/:id/reopen', jobPostController.reopenJobPost); // Reopen job by ID


router.put('/api/job-posts/job/:id/apply',  jobPostController.applyJobPost); // Close job by ID
router.get('/api/job-posts/jobs/applied', jobPostController.getAppliedJobPosts); // Get all closed jobs
router.put('/api/job-posts/job/:id/withdraw', jobPostController.withdrawJobPost); // Reopen job by ID


router.put('/api/job-posts/job/:id/save',  jobPostController.saveJobPost); // Close job by ID
router.get('/api/job-posts/jobs/saved', jobPostController.getSavedJobPosts); // Get all closed jobs
router.put('/api/job-posts/job/:id/unsave', jobPostController.unsaveJobPost); // Reopen job by ID

module.exports = router;
