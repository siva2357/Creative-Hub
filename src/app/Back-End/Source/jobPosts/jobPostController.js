const JobPost = require("../jobPosts/jobPostModel");
const RecruiterProfile = require("../profile-details/recruiterProfileModel");
const Company = require("../company/companyModel");
const mongoose = require("mongoose");
const Recruiter = require('../models/recruiterModel');
const Seeker = require('../models/seekerModel');

exports.createJobPost = async (req, res) => {
  try {
    // Destructure jobPostDetails from the request body
    const { jobId, jobRoleTitle, jobType, salary, location, category, vacancy, jobDescription, applyByDate } = req.body;

    // Log request body for debugging
    console.log("Received request body:", req.body);

    // Get recruiterId from authenticated user
    const recruiterId = req.recruiterId;

    // Validate recruiterId format
    if (!recruiterId || !mongoose.Types.ObjectId.isValid(recruiterId)) {
      return res.status(400).json({ message: "Invalid recruiter ID format" });
    }

    // Fetch recruiter and recruiter profile
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    const recruiterProfile = await RecruiterProfile.findOne({ recruiterId });
    if (!recruiterProfile) {
      return res.status(404).json({ message: "Recruiter profile not found" });
    }

    // Extract recruiter details
    const { firstName, lastName } = recruiter.registrationDetails || {};
    if (!firstName || !lastName) {
      return res.status(400).json({ message: "Recruiter does not have complete profile details" });
    }

    // Check if recruiter has an associated company
    const companyName = recruiterProfile?.profileDetails?.professionalDetails?.companyName;
    if (!companyName) {
      return res.status(400).json({ message: "Recruiter does not have an associated company" });
    }

    // Find the company in the database
    const company = await Company.findOne({ "companyDetails.companyName": companyName });
    if (!company) {
      return res.status(404).json({ message: "Company not found in database" });
    }

    // Validate required job post fields
    if (!jobId || !jobRoleTitle || !jobType || !salary || !vacancy || !applyByDate || !jobDescription) {
      return res.status(400).json({ message: "All fields in jobPostDetails are required" });
    }

    // 🔥 Fix: Ensure jobDescription is always a string
    const formattedJobDescription =
      typeof jobDescription === "object" ? JSON.stringify(jobDescription) : jobDescription;

    // Create the job post
    const newJobPost = new JobPost({
      recruiterId: recruiter._id,
      companyId: company._id,
      jobPostDetails: {
        jobId,
        jobRoleTitle,
        jobType,
        salary,
        location,
        category,
        vacancy,
        jobDescription: formattedJobDescription,  // 🔥 Fixed jobDescription
        applyByDate,
      }
    });

    // Save the job post
    await newJobPost.save();
    res.status(201).json({ message: "Job posted successfully", job: newJobPost });

  } catch (error) {
    console.error("Error creating job post:", error);
    res.status(500).json({ message: "Error creating job post", error: error.message });
  }
};


// ✅ Update Job Post
exports.updateJobPost = async (req, res) => {
  try {
    const { jobId, recruiterId } = req.params; // Get jobId and recruiterId from URL params

    // Find the existing job post under the given recruiter
    const existingJob = await JobPost.findOne({ _id: jobId, recruiterId });
    if (!existingJob) {
      return res.status(404).json({ message: "Job post not found for this recruiter" });
    }

    // 🔥 Ensure `status` remains unchanged if not included in the update request
    const updatedJobDetails = {
      ...existingJob.jobPostDetails, // Keep existing job details
      ...req.body.jobPostDetails, // Override with new data
      status: req.body.jobPostDetails?.status || existingJob.jobPostDetails.status, // Retain status if not provided
    };

    // Update the job post
    const updatedJob = await JobPost.findByIdAndUpdate(
      jobId,
      { $set: { jobPostDetails: updatedJobDetails } },
      { new: true }
    );

    res.status(200).json({ message: "Job post updated successfully", job: updatedJob });

  } catch (error) {
    res.status(500).json({ message: "Error updating job post", error: error.message });
  }
};


exports.closeJobPost = async (req, res) => {
  try {
    const { jobId, recruiterId } = req.params; // Extract from params

    // Ensure recruiter owns the job
    const job = await JobPost.findOneAndUpdate(
      { _id: jobId, recruiterId: recruiterId }, // Use postedBy field instead of recruiterId
      { $set: { "jobPostDetails.status": "Closed" } }, // Correct update syntax
      { new: true }
    );

    if (!job) return res.status(404).json({ message: "Job post not found or unauthorized" });

    res.status(200).json({ message: "Job post closed successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Error closing job post", error: error.message });
  }
};


// ✅ Reopen Job Post
exports.reopenJobPost = async (req, res) => {
  try {
    const { jobId, recruiterId } = req.params;

    // Ensure recruiter owns the job
    const job = await JobPost.findOneAndUpdate(
      { _id: jobId, recruiterId: recruiterId },
      { $set: { "jobPostDetails.status": "Open" } },
      { new: true }
    );

    if (!job) return res.status(404).json({ message: "Job post not found or unauthorized" });

    res.status(200).json({ message: "Job post reopened successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Error reopening job post", error: error.message });
  }
};


// ✅ Delete Job Post (Only if Closed)
exports.deleteJobPost = async (req, res) => {
  try {
    const { jobId, recruiterId } = req.params;

    const job = await JobPost.findOne({ _id: jobId, recruiterId: recruiterId });

    if (!job) return res.status(404).json({ message: "Job post not found or unauthorized" });

    if (job.jobPostDetails.status !== "Closed") {
      return res.status(400).json({ message: "Only closed job posts can be deleted" });
    }

    await JobPost.findByIdAndDelete(jobId);
    res.status(200).json({ message: "Job post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job post", error: error.message });
  }
};


exports.getJobsByRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    const openJobs = await JobPost.find(
      {
        recruiterId: new mongoose.Types.ObjectId(recruiterId),
        "jobPostDetails.status": "Open",
      },
      { "jobPostDetails": 1, _id: 1 }
    );

    return res.status(200).json({
      totalOpenJobs: openJobs.length,
      jobPosts: openJobs,
    });

  } catch (error) {
    console.error("Error fetching open jobs:", error);
    res.status(500).json({ message: "Error fetching open jobs", error: error.message });
  }
};

exports.getRecruiterJobPostById = async (req, res) => {
  try {
    const { jobId, recruiterId } = req.params;

    const jobPost = await JobPost.findById(jobId);
    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    // Ensure job post belongs to the recruiter
    if (jobPost.recruiterId.toString() !== recruiterId) {
      return res.status(403).json({ message: 'Unauthorized access to this job post' });
    }

    res.status(200).json(jobPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job details: ' + error.message });
  }
};


// ✅ Get Only Closed Jobs Posted by a Specific Recruiter
exports.getClosedJobsByRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;

    const closedJobs = await JobPost.find(
      {
        recruiterId: new mongoose.Types.ObjectId(recruiterId),
        "jobPostDetails.status": "Closed",
      },
      { "jobPostDetails": 1, _id: 1 } // ✅ Fetch only jobPostDetails and _id (Job ID)
    );

    return res.status(200).json({
      totalClosedJobs: closedJobs.length,
      jobPosts: closedJobs, // ✅ Returns empty array [] if no closed jobs exist
    });

  } catch (error) {
    console.error("Error fetching closed jobs:", error);
    res.status(500).json({ message: "Error fetching closed jobs", error: error.message });
  }
};

// ✅ Get a Single Job Post by ID
exports.getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await JobPost.findById(jobId)
      .populate("companyId", "companyDetails") // Fetch company details
      .populate("recruiterId", "profileDetails.basicDetails.firstName profileDetails.basicDetails.lastName profileDetails.contactDetails.email"); // Fetch recruiter details

    if (!job) return res.status(404).json({ message: "Job post not found" });

    // ✅ If recruiterId is null, return default values
    if (!job.recruiterId) {
      return res.status(200).json({
        ...job.toObject(),
        recruiterId: { profileDetails: { basicDetails: { firstName: "N/A", lastName: "N/A" }, contactDetails: { email: "N/A" } } }
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job post", error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find().populate("recruiterId").populate("companyId");

console.log("Jobs after populate:", jobs); // Log the populated jobs

if (!jobs.length) return res.status(404).json({ message: "No job posts found" });

res.status(200).json(jobs);

  } catch (error) {
    // Enhanced error message
    res.status(500).json({ message: `Error fetching jobs: ${error.message}`, stack: error.stack });
  }
};

// Apply for a job
exports.applyForJob = async (req, res) => {
  try {
    const { seekerId } = req.params;
    const { jobId } = req.body;
    const jobPost = await JobPost.findById(jobId);
    if (!jobPost) return res.status(404).json({ message: "Job post not found" });
    const alreadyApplied = jobPost.applicants.some(app => app.seekerId.toString() === seekerId);
    if (alreadyApplied) return res.status(400).json({ message: "You have already applied for this job" });
    jobPost.applicants.push({ seekerId, appliedAt: new Date() });
    await jobPost.save();
    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error applying for job", error });
  }
};


exports.applyForJob = async (req, res) => {
  try {
    const { seekerId, jobId } = req.params;

    // Validate the ObjectId format for seekerId and jobId
    if (!mongoose.Types.ObjectId.isValid(seekerId)) {
      return res.status(400).json({ message: "Invalid seeker ID format" });
    }
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    // Find the job post by its ID
    const jobPost = await JobPost.findById(jobId);
    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    // Check if the seeker has already applied
    const alreadyApplied = jobPost.applicants.some(app => app.seekerId.toString() === seekerId);
    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    // Add the applicant to the job post
    jobPost.applicants.push({ seekerId, appliedAt: new Date() });
    await jobPost.save();

    res.status(200).json({ message: "Application submitted successfully", jobPost });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ message: "Error applying for job", error: error.message });
  }
};


// Withdraw job application (within 2 minutes)
exports.withdrawApplication = async (req, res) => {
  try {
    const { seekerId, jobId } = req.params;

    const jobPost = await JobPost.findById(jobId);
    if (!jobPost) return res.status(404).json({ message: "Job post not found" });

    const applicantIndex = jobPost.applicants.findIndex(app => app.seekerId.toString() === seekerId);
    if (applicantIndex === -1) return res.status(400).json({ message: "You have not applied for this job" });

    const appliedAt = new Date(jobPost.applicants[applicantIndex].appliedAt);
    const now = new Date();
    const diffMinutes = (now - appliedAt) / 60000;

    if (diffMinutes > 2) return res.status(400).json({ message: "Withdrawal period has expired" });

    jobPost.applicants.splice(applicantIndex, 1);
    await jobPost.save();

    res.status(200).json({ message: "Application withdrawn successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error withdrawing application", error });
  }
};

// Get all applied jobs for a specific seeker
exports.getAppliedJobs = async (req, res) => {
  try {
    const { seekerId } = req.params;
    // const appliedJobs = await JobPost.find({ "applicants.seekerId": seekerId }).select("-applicants");
    const appliedJobs = await JobPost.find({ "applicants.seekerId": seekerId }).populate("recruiterId").populate("companyId").select("-applicants");

    if (!appliedJobs.length) {
      return res.status(404).json({ message: "No applied jobs found" });
    }

    res.status(200).json(appliedJobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applied jobs", error });
  }
};



exports.getJobApplicantsByRecruiter = async (req, res) => {
  try {
    const { recruiterId} = req.params;

    // Fetch all open job posts for the recruiter, excluding companyId and recruiterId in the response
    const jobPosts = await JobPost.find(
      {
        recruiterId: new mongoose.Types.ObjectId(recruiterId),
        "jobPostDetails.status": "Open",
      },

    ).select("jobPostDetails applicants totalApplicants ");

    if (!jobPosts || jobPosts.length === 0) {
      console.log("No open job posts found for this recruiter");
      return res.status(200).json({ totalApplicants: 0, jobPosts: [] });
    }

    // Prepare job posts with total applicants count
    const jobPostDetails = jobPosts.map((jobPost) => {
    const totalApplicants = jobPost.applicants ? jobPost.applicants.length : 0;

      return {
        _id: jobPost._id, // Use _id here to get the MongoDB ObjectId
        jobPostDetails: jobPost.jobPostDetails,
        totalApplicants: totalApplicants,
      };
    });

    return res.status(200).json({
      totalJobPosts: jobPostDetails.length, // Total number of job posts returned
      jobPosts: jobPostDetails,
    });

  } catch (error) {
    console.error("Error fetching job applicants by recruiter:", error);
    res.status(500).json({ message: "Error fetching job posts", error: error.message });
  }
};







exports.getJobApplicants = async (req, res) => {
  try {
    const { recruiterId, jobId, seekerId } = req.params;

    console.log("Recruiter ID from request:", recruiterId);
    console.log("Job Post ID from request:", jobId);

    const jobPost = await JobPost.findOne({
      _id: new mongoose.Types.ObjectId(jobId),
      recruiterId: new mongoose.Types.ObjectId(recruiterId),
    })
    .populate({
      path: "applicants.seekerId",
      model: "Seeker",
      select: "registrationDetails phone resume",
    })
    .populate("companyId", "companyName location");

    if (!jobPost) {
      console.log("Job post not found or recruiter does not own this job");
      return res.status(403).json({ message: "Unauthorized access or job post not found" });
    }

    // ✅ Fix: Always return an empty array if no applicants exist
    const totalApplicants = jobPost.applicants ? jobPost.applicants.length : 0;

    if (totalApplicants === 0) {
      console.log("No applicants found for this job post");
      return res.status(200).json({ totalApplicants, applicants: [] });
    }

    let seekerDetails = null;
    if (seekerId) {
      const seeker = await Seeker.findById(new mongoose.Types.ObjectId(seekerId))
        .select("registrationDetails phone resume");
      if (!seeker) {
        return res.status(404).json({ message: "Seeker not found" });
      }
      seekerDetails = seeker;
    }

    res.status(200).json({
      jobTitle: jobPost.jobPostDetails.jobRoleTitle,
      totalApplicants, // ✅ Include total number of applicants
      applicants: jobPost.applicants.map(app => ({
        seekerId: app.seekerId?._id,
        firstName: app.seekerId?.registrationDetails?.firstName,
        lastName: app.seekerId?.registrationDetails?.lastName,
        email: app.seekerId?.registrationDetails?.email,
        appliedAt: app.appliedAt
      })),
      seekerDetails, // Only if seekerId is provided
    });

  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Error fetching applicants", error });
  }
};









