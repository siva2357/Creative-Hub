
const mongoose = require("mongoose");
const jobPostSchema = new mongoose.Schema(
  {
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "Recruiter", required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    totalCount: { type: Number }, // Default value for safety
    totalApplicants: { type: Number }, // ✅ Tracks total applicants

    jobPostDetails: {
      jobId: { type: String, required: true }, // Consider using ObjectId if it's unique per job
      jobType: { type: String, required: true },
      jobRoleTitle: { type: String, required: true },
      salary: { type: String, required: true },
      vacancy: { type: Number, required: true },
      jobDescription: { type: String, required: true },
      postedOn: { type: Date, default: Date.now },
      applyByDate: { type: Date, required: true },
      status: {
        type: String,
        enum: ["Open", "Closed", "Draft", "Pending"], // More flexible options
        default: "Open",
      },
    },

    applicants: [
 // Default value for safety
      {
        seekerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seeker", required: true },
        appliedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` automatically
);

module.exports = mongoose.model("JobPost", jobPostSchema);


