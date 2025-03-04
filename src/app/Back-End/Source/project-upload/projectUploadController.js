const mongoose = require('mongoose'); // ✅ Import mongoose
const ProjectUpload = require('./projectUploadModel');
const Seeker = require('../models/seekerModel');

// exports.createProjectUpload = async (req, res) => {
//   try {
//       console.log("Extracted Seeker ID:", req.seekerId);

//       if (!req.seekerId) {
//           return res.status(401).json({ message: "Unauthorized: Seeker ID is missing" });
//       }


//       // Get seekerId from authenticated user
//       const seekerId = req.seekerId;

//       // Validate seekerId format
//       if (!seekerId || !mongoose.Types.ObjectId.isValid(seekerId)) {
//           return res.status(400).json({ message: "Invalid seeker ID format" });
//       }

//       // Fetch seeker details
//       const seeker = await Seeker.findById(seekerId);
//       if (!seeker) {
//           return res.status(404).json({ message: "Seeker not found" });
//       }

//       const { file, projectTitle, projectType, projectDescription, softwares, tags } = req.body;
//       if (!file || !file.fileName || !file.url || !projectTitle || !projectType || !projectDescription || !softwares ||!tags) {
//           return res.status(400).json({ message: "All required fields must be provided" });
//       }

//       const formattedProjectDescription =
//       typeof projectDescription === "object" ? JSON.stringify(projectDescription) : projectDescription;


//       const newProjectUpload = new ProjectUpload({
//           seekerId: seeker._id,
//           projectDetails: { file, projectTitle, projectType, projectDescription :formattedProjectDescription, softwares, tags }
//       });

//       await newProjectUpload.save();
//       res.status(201).json({ message: "Project created successfully", project: newProjectUpload });
//   } catch (error) {
//       console.error("Error:", error);
//       res.status(500).json({ message: error.message });
//   }
// };



exports.createProjectUpload = async (req, res) => {
  try {
      const { projectDetails } = req.body;
      if (! projectDetails) {
          return res.status(400).json({ message: "Project details are required" });
      }
      if (!req.seekerId) {
          return res.status(401).json({ message: "Unauthorized: Seeker ID is missing" });
      }
      const newProject = new ProjectUpload({
          seekerId: req.seekerId,
          projectDetails
      });
      await  newProject.save();
      res.status(201).json({ message: "Company created successfully", project:  newProject });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};



exports.updateProject = async (req, res) => {
  try {
    const { projectId, seekerId } = req.params;
    const existingProject = await ProjectUpload.findOne({ _id: projectId, seekerId });
    if (!existingProject ) {
      return res.status(404).json({ message: "Project not found for this recruiter" });
    }
    const updatedProjectDetails = {
      ...existingProject. projectDetails,
      ...req.body. projectDetails,
    };
    const updatedProject = await ProjectUpload.findByIdAndUpdate(
      projectId,
      { $set: { projectDetails: updatedProjectDetails } },
      { new: true }
    );

    res.status(200).json({ message: "Project updated successfully", project: updatedProject });

  } catch (error) {
    res.status(500).json({ message: "Error updating job post", error: error.message });
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const { projectId, seekerId } = req.params;

    const project = await ProjectUpload.findOne({ _id: projectId, seekerId: seekerId });

    if (!project) return res.status(404).json({ message: "Job post not found or unauthorized" });


    await  ProjectUpload.findByIdAndDelete(projectId);
    res.status(200).json({ message: "Job post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job post", error: error.message });
  }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await ProjectUpload.find();
        res.status(200).json({
            totalProjects: projects.length,
            projects
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getProjectById = async (req, res) => {
  try {
    const { projectId, seekerId } = req.params;

    const project = await ProjectUpload.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    // Ensure job post belongs to the recruiter
    if (project.seekerId.toString() !== seekerId) {
      return res.status(403).json({ message: 'Unauthorized access to this job post' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job details: ' + error.message });
  }
};
