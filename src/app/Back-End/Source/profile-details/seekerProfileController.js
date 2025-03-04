const Seeker = require('../models/seekerModel');
const SeekerProfile = require('../profile-details/seekerProfileModel');

exports.createSeekerProfile = async (req, res) => {
    try {
        if (!req.seekerId) {
            return res.status(401).json({ message: "Unauthorized: Seeker ID is missing" });
        }

        const seeker = await Seeker.findById(req.seekerId);
        if (!seeker) {
            return res.status(404).json({ message: "Seeker not found" });
        }

        const existingProfile = await SeekerProfile.findOne({ seekerId: req.seekerId });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile already exists for this seeker" });
        }

        // Auto-fill basic details from registrationDetails
        const newSeekerProfile = new SeekerProfile({
            seekerId: req.seekerId,
            profileDetails: {
                basicDetails: {
                    firstName: seeker.registrationDetails.firstName,
                    lastName: seeker.registrationDetails.lastName,
                    userName: seeker.registrationDetails.userName,
                    email: seeker.registrationDetails.email
                },
                ...req.body.profileDetails // Merge other details from frontend
            }
        });

        await newSeekerProfile.save();
        res.status(201).json({ message: "Seeker profile created successfully", seekerProfile: newSeekerProfile });

    } catch (error) {
        console.error("Error creating seeker profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getSeekerProfile = async (req, res) => {
  try {
      const seekerId = req.params.seekerId; // Get from URL

      if (!seekerId) {
          return res.status(401).json({ message: "Unauthorized: Seeker ID is missing" });
      }

      console.log("Extracted seeker ID:", seekerId); // Debug log

      const seeker = await Seeker.findById(seekerId);
      const seekerProfile = await SeekerProfile.findOne({ seekerId });

      if (!seeker || !seekerProfile) {
          return res.status(404).json({ message: "Seeker profile not found" });
      }

      if (!seekerProfile.profileDetails.basicDetails) {
        seekerProfile.profileDetails.basicDetails = {};
      }

      seekerProfile.profileDetails.basicDetails.firstName = seeker.registrationDetails.firstName;
      seekerProfile.profileDetails.basicDetails.lastName = seeker.registrationDetails.lastName;
      seekerProfile.profileDetails.basicDetails.userName = seeker.registrationDetails.userName;
      seekerProfile.profileDetails.basicDetails.email = seeker.registrationDetails.email;

      res.status(200).json(seekerProfile);
  } catch (error) {
      console.error("Error fetching recruiter profile:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};



exports.updateSeekerProfile = async (req, res) => {
  try {
      if (!req.seekerId) {
          return res.status(401).json({ message: "Unauthorized: Seeker ID is missing" });
      }

      const seeker = await Seeker.findById(req.seekerId);
      let seekerProfile = await SeekerProfile.findOne({ seekerId: req.seekerId });

      if (!seeker || !seekerProfile) {
          return res.status(404).json({ message: "Seeker profile not found" });
      }

      const { profileDetails } = req.body;

      // Prevent email modification
      if (profileDetails?.basicDetails?.email && profileDetails.basicDetails.email !== seeker.registrationDetails.email) {
          return res.status(400).json({ message: "Email cannot be changed" });
      }

      // Update registration details for firstName, lastName, userName
      seeker.registrationDetails.firstName = profileDetails?.basicDetails?.firstName || seeker.registrationDetails.firstName;
      seeker.registrationDetails.lastName = profileDetails?.basicDetails?.lastName || seeker.registrationDetails.lastName;
      seeker.registrationDetails.userName = profileDetails?.basicDetails?.userName || seeker.registrationDetails.userName;

      await seeker.save(); // Save updated registration details

      // Remove firstName, lastName, userName, email from profileDetails to prevent update
      if (profileDetails?.basicDetails) {
          delete profileDetails.basicDetails.firstName;
          delete profileDetails.basicDetails.lastName;
          delete profileDetails.basicDetails.userName;
          delete profileDetails.basicDetails.email;
      }

      // Update other profile fields
      seekerProfile.profileDetails = {
          ...seekerProfile.profileDetails,
          ...profileDetails
      };
      await seekerProfile.save();

      res.status(200).json(seekerProfile);

  } catch (error) {
      console.error("Error updating seeker profile:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

