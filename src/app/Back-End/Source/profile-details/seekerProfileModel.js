const mongoose = require('mongoose');

const seekerProfileSchema = mongoose.Schema({
    seekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seeker' , required: true}, // Reference to Recruiter
    profileDetails: {
      profilePicture:
      {
        fileName: { type: String, required: true },
        url: { type: String, required: true }
      },
        basicDetails: {
            firstName: { type: String, required: false },
            lastName: { type: String, required: false },
            userName: { type: String, required: false },
            email: { type: String, required: false},
            gender: { type: String, required: true },
            dateOfBirth: { type: Date, required: true },
        },
        contactDetails: {
            phoneNumber: { type: String, required: true },
            streetAddress: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            pincode: { type: String, required: true },
        },
        educationalDetails: {
          universityName: { type: String, required: true },
          universityDegree: { type: String, required: true },
          yearOfGraduation: { type: Date, required: true },
          universityNumber: { type: String, required: true },
        },
        bioDetails: {
            bioDescription: { type: String, required: true },
        }

    }
}, { timestamps: true });

module.exports = mongoose.model('SeekerProfile', seekerProfileSchema);
