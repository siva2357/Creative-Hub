const RecruiterProfile = require('../profile-details/recruiterProfileModel');
const Recruiter = require('../models/recruiterModel');

exports.createRecruiterProfile = async (req, res) => {
    try {
        if (!req.recruiterId) {
            return res.status(401).json({ message: "Unauthorized: Recruiter ID is missing" });
        }

        const recruiter = await Recruiter.findById(req.recruiterId);
        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" });
        }

        const existingProfile = await RecruiterProfile.findOne({ recruiterId: req.recruiterId });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile already exists for this recruiter" });
        }

        // Auto-fill basic details from registrationDetails
        const newRecruiterProfile = new RecruiterProfile({
            recruiterId: req.recruiterId,
            profileDetails: {
                basicDetails: {
                    firstName: recruiter.registrationDetails.firstName,
                    lastName: recruiter.registrationDetails.lastName,
                    userName: recruiter.registrationDetails.userName,
                    email: recruiter.registrationDetails.email
                },
                ...req.body.profileDetails // Merge other details from frontend
            }
        });

        await newRecruiterProfile.save();
        res.status(201).json({ message: "Recruiter profile created successfully", recruiterProfile: newRecruiterProfile });

    } catch (error) {
        console.error("Error creating recruiter profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getRecruiterProfile = async (req, res) => {
  try {
      const recruiterId = req.params.recruiterId; // Get from URL

      if (!recruiterId) {
          return res.status(401).json({ message: "Unauthorized: Recruiter ID is missing" });
      }

      console.log("Extracted Recruiter ID:", recruiterId); // Debug log

      const recruiter = await Recruiter.findById(recruiterId);
      const recruiterProfile = await RecruiterProfile.findOne({ recruiterId });

      if (!recruiter || !recruiterProfile) {
          return res.status(404).json({ message: "Recruiter profile not found" });
      }

      if (!recruiterProfile.profileDetails.basicDetails) {
          recruiterProfile.profileDetails.basicDetails = {};
      }

      recruiterProfile.profileDetails.basicDetails.firstName = recruiter.registrationDetails.firstName;
      recruiterProfile.profileDetails.basicDetails.lastName = recruiter.registrationDetails.lastName;
      recruiterProfile.profileDetails.basicDetails.userName = recruiter.registrationDetails.userName;
      recruiterProfile.profileDetails.basicDetails.email = recruiter.registrationDetails.email;

      res.status(200).json(recruiterProfile);
  } catch (error) {
      console.error("Error fetching recruiter profile:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};



exports.updateRecruiterProfile = async (req, res) => {
    try {
        if (!req.recruiterId) {
            return res.status(401).json({ message: "Unauthorized: Recruiter ID is missing" });
        }

        const recruiter = await Recruiter.findById(req.recruiterId);
        let recruiterProfile = await RecruiterProfile.findOne({ recruiterId: req.recruiterId });

        if (!recruiter || !recruiterProfile) {
            return res.status(404).json({ message: "Recruiter profile not found" });
        }

        const { profileDetails } = req.body;

        // Prevent email modification
        if (profileDetails?.basicDetails?.email && profileDetails.basicDetails.email !== recruiter.registrationDetails.email) {
            return res.status(400).json({ message: "Email cannot be changed" });
        }

        // Update registration details for firstName, lastName, userName
        recruiter.registrationDetails.firstName = profileDetails?.basicDetails?.firstName || recruiter.registrationDetails.firstName;
        recruiter.registrationDetails.lastName = profileDetails?.basicDetails?.lastName || recruiter.registrationDetails.lastName;
        recruiter.registrationDetails.userName = profileDetails?.basicDetails?.userName || recruiter.registrationDetails.userName;

        await recruiter.save(); // Save updated registration details

        // Remove firstName, lastName, userName, email from profileDetails to prevent update
        if (profileDetails?.basicDetails) {
            delete profileDetails.basicDetails.firstName;
            delete profileDetails.basicDetails.lastName;
            delete profileDetails.basicDetails.userName;
            delete profileDetails.basicDetails.email;
        }

        // Update other profile fields
        recruiterProfile.profileDetails = {
            ...recruiterProfile.profileDetails,
            ...profileDetails
        };
        await recruiterProfile.save();

        res.status(200).json(recruiterProfile);

    } catch (error) {
        console.error("Error updating recruiter profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
