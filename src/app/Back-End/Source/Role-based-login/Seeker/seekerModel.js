const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const seekerSchema = new Schema({
    registrationDetails: {
       signupDetails: {
            fullName: { type: String, required: true },
            userName: { type: String, required: true },
            gender: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
        },
        contactDetails: {
            phoneNumber: { type: String, required: true },
            streetAddress: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            pincode: { type: String, required: true },
        },
        educationDetails: {
            instituteName: { type: String, required: true },
            programOrDegree: { type: String, required: true },
            departmentName: { type: String, required: true },
            branchOrSpecialization: { type: String, required: true },
            instituteRollNumber: { type: String, required: true },
        },
       bioDetails: {
            bio: { type: String, required: true },
        },
        profileDetails: {
            profilePicture: { type: String, required: true },
        },
    },
    role: { type: String, default: 'seeker' }
});

// Pre-save hook to hash the password before saving
seekerSchema.pre('save', async function(next) {
    if (this.isModified('registrationDetails.signupDetails.password')) {
        this.registrationDetails.signupDetails.password = await bcrypt.hash(this.registrationDetails.signupDetails.password, 10);
    }
    next();
});

const Seeker = mongoose.model('Seeker', seekerSchema);
module.exports = Seeker;
