const jobPostService = require ('../services/jobPostService');

exports.createJobPost = async (req, res) => {
    try {
        const jobPost = await jobPostService.createJobPost(req.body);
        res.status(201).json(jobPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job post: ' + error.message });
    }
};

exports.getAllJobPosts = async (req, res) => {
    try {
        const jobPosts = await jobPostService.getAllJobPosts();
        res.status(200).json(jobPosts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch job posts: ' + error.message });
    }
};


exports.getJobPostById = async (req, res) => {
    try {
      const jobPost = await jobPostService.getJobPostById(req.params.id);  // Ensure req.params.id is not undefined
      if (!jobPost) {
        return res.status(404).json({ message: 'Job post not found' });
      }
      res.status(200).json(jobPost);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job details: ' + error.message });
    }
  };
  
  

exports.updateJobPost = async (req, res) => {
    try {
        const updatedJobPost = await jobPostService.updateJobPost(req.params.id, req.body);
        res.status(200).json(updatedJobPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update job post: ' + error.message });
    }
};

exports.deleteJobPost = async (req, res) => {
    try {
        const result = await jobPostService.deleteJobPost(req.params.id);
        if (!result) return res.status(404).json({ message: 'Job post not found' });
        res.status(200).json({ message: 'Job post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job post: ' + error.message });
    }
};

exports.closeJobPost = async (req, res) => {
    try {
        const jobPost = await jobPostService.closeJobPost(req.params.id);
        if (!jobPost) {
            return res.status(404).json({ message: 'Job post not found' });
        }
        res.status(200).json({ message: 'Job post closed successfully', jobPost });
    } catch (error) {
        res.status(500).json({ error: 'Failed to close job post: ' + error.message });
    }
};

exports.getClosedJobPosts = async (req, res) => {
    try {
        const jobPosts = await jobPostService.getClosedJobPosts();
        res.status(200).json(jobPosts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch closed job posts: ' + error.message });
    }
};

exports.reopenJobPost = async (req, res) => {
    try {
        const jobPost = await jobPostService.reopenJobPost(req.params.id);
        if (!jobPost) return res.status(404).json({ message: 'Job post not found' });
        res.status(200).json({ message: 'Job post reopened successfully', jobPost });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reopen job post: ' + error.message });
    }
};


exports.applyJobPost = async (req, res) => {
    try {
        const jobPost = await jobPostService.applyJobPost(req.params.id);
        if (!jobPost) {
            return res.status(404).json({ message: 'Job post not found' });
        }
        res.status(200).json({ message: 'Job post applied successfully', jobPost });
    } catch (error) {
        res.status(500).json({ error: 'Failed to apply for job post: ' + error.message });
    }
};

exports.getAppliedJobPosts = async (req, res) => {
    try {
        const jobPosts = await jobPostService.getAppliedJobPosts();
        res.status(200).json(jobPosts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch applied job posts: ' + error.message });
    }
};

exports.withdrawJobPost = async (req, res) => {
    try {
        const result = await jobPostService.withdrawJobPost(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to withdraw job post: ' + error.message });
    }
};


exports.saveJobPost = async (req, res) => {
    try {
        const jobPost = await jobPostService.saveJobPost(req.params.id);
        if (!jobPost) {
            return res.status(404).json({ message: 'Job post not found' });
        }
        res.status(200).json({ message: 'Job post saved successfully', jobPost });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save for job post: ' + error.message });
    }
};

exports.getSavedJobPosts = async (req, res) => {
    try {
        const jobPosts = await jobPostService.getSavedJobPosts();
        res.status(200).json(jobPosts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch saved job posts: ' + error.message });
    }
};

exports.unsaveJobPost = async (req, res) => {
    try {
        const result = await jobPostService.unsaveJobPost(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to withdraw job post: ' + error.message });
    }
};

