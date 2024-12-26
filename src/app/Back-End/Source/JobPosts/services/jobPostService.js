const { ActiveJobPost, AppliedJobPost, ClosedJobPost, SavedJobPost } = require('../models/jobPostModel');


const createJobPost = async (jobPostData) => {
    console.log('Creating active job post with data:', jobPostData);
    const newJobPost = new ActiveJobPost(jobPostData);
    try {
        return await newJobPost.save();
    } catch (error) {
        console.error('Error creating job post:', error);
        throw new Error('Error creating job post: ' + error.message);
    }
};

const getAllJobPosts = async () => {
    try {
        const activeJobPosts = await ActiveJobPost.find({ status: 'active' });
        return [...activeJobPosts];
    } catch (error) {
        throw new Error('Error fetching active or applied job posts: ' + error.message);
    }
};


const getClosedJobPosts = async () => {
    try {
        return await ClosedJobPost.find({ status: 'closed' });
    } catch (error) {
        throw new Error('Error fetching closed job posts: ' + error.message);
    }
};

const closeJobPost = async (id) => {
    const jobPost = await ActiveJobPost.findByIdAndUpdate(
        id,
        { status: 'closed' },
        { new: true } 
    );
    if (!jobPost) throw new Error('Active job post not found');

    const closedJobPost = new ClosedJobPost(jobPost.toObject());
    await closedJobPost.save();
    await ActiveJobPost.findByIdAndDelete(id);

    return closedJobPost;
};

const reopenJobPost = async (id) => {
    const jobPost = await ClosedJobPost.findByIdAndUpdate(
        id,
        { status: 'active' },
        { new: true } 
    );
    if (!jobPost) throw new Error('Closed job post not found');

    const activeJobPost = new ActiveJobPost(jobPost.toObject());
    await activeJobPost.save();
    await ClosedJobPost.findByIdAndDelete(id);
    return activeJobPost;
};

const getJobPostById = async (id) => {
    try {
      if (!id) {
        throw new Error('Job ID is required');
      }
      // Ensure the ID is in the correct format
      const job = await ActiveJobPost.findById(id);
      return job;
    } catch (error) {
      throw new Error('Error fetching job post by ID: ' + error.message);
    }
  };
  
  
  

const updateJobPost = async (id, jobPostData) => {
    try {
        const updatedJobPost = await ActiveJobPost.findByIdAndUpdate(id, jobPostData, {
            new: true,
            runValidators: true
        });

        if (!updatedJobPost) throw new Error('Job post not found');
        return updatedJobPost;
    } catch (error) {
        throw new Error('Error updating job post: ' + error.message);
    }
};

const deleteJobPost = async (id) => {
    try {
        const deletedJobPost = await ClosedJobPost.findByIdAndDelete(id);
        if (!deletedJobPost) throw new Error('Active job post not found');
        return { message: 'Active job post deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting job post: ' + error.message);
    }
};

const applyJobPost = async (id) => {
    const jobPost = await ActiveJobPost.findById(id);
    if (!jobPost) throw new Error('Active job post not found');
    const appliedJobPost = new AppliedJobPost({
        ...jobPost.toObject(),
        status: 'applied'
    });
    await appliedJobPost.save();
    return appliedJobPost;
};

const getAppliedJobPosts = async () => {
    try {
        return await AppliedJobPost.find({ status: 'applied' });
    } catch (error) {
        throw new Error('Error fetching applied job posts: ' + error.message);
    }
};

const withdrawJobPost = async (id) => {
    try {
        const withdrawJobPost = await AppliedJobPost.findByIdAndDelete(id);
        if (!withdrawJobPost) throw new Error('Applied job post not found');
        return { message: 'Job post withdrawn successfully' };
    } catch (error) {
        throw new Error('Error deleting job post: ' + error.message);
    }
};

const saveJobPost = async (id) => {
    const jobPost = await ActiveJobPost.findById(id);
    if (!jobPost) throw new Error('Active job post not found');
    const savedJobPost = new SavedJobPost({
        ...jobPost.toObject(),
        status: 'saved'
    });
    await savedJobPost.save();
    return savedJobPost;
};

const getSavedJobPosts = async () => {
    try {
        return await SavedJobPost.find({ status: 'saved' });
    } catch (error) {
        throw new Error('Error fetching applied job posts: ' + error.message);
    }
};

const unsaveJobPost = async (id) => {
    try {
        const unsaveJobPost = await SavedJobPost.findByIdAndDelete(id);
        if (!unsaveJobPost) throw new Error('Saved job post not found');
        return { message: 'Job post unsaved successfully' };
    } catch (error) {
        throw new Error('Error unsaving job post: ' + error.message);
    }
};



module.exports = {
    getAllJobPosts,
    getJobPostById,
    createJobPost,
    updateJobPost,
    deleteJobPost,
    closeJobPost,
    reopenJobPost,
    getClosedJobPosts,
    applyJobPost,
    withdrawJobPost,
    getAppliedJobPosts,
    saveJobPost,
    getSavedJobPosts,
    unsaveJobPost
};