const mongoose = require('mongoose');

const recruiterProfileSchema = mongoose.Schema({
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' }, // Reference to Recruiter
    profileDetails: {
      profilePicture: {
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
        professionalDetails: {
            companyName: { type: String, required: true },
            designation: { type: String, required: true },
            experience: { type: String, required: true },
            employeeCode: { type: String, required: true },
        },
        bioDetails: {
            bioDescription: { type: String, required: true },
        }

    }
}, { timestamps: true });

module.exports = mongoose.model('RecruiterProfile', recruiterProfileSchema);
