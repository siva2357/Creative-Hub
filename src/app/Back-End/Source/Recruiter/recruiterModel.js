const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
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
         professionalDetails: {
            companyName: { type: String, required: true },
             departmentName: { type: String, required: true },
             designation: { type: String, required: true },
             jobLevel: { type: String, required: true },
             experience: { type: String, required: true },
             companyId: { type: String, required: true },

         },
        bioDetails: {
             bio: { type: String, required: true },
         },
         profileDetails: {
             profilePicture: { type: String, required: true },
         },
     },
    role: { type: String, default: 'recruiter' } // Default role set to 'recruiter'
});

// Hash password before saving
recruiterSchema.pre('save', async function(next) {
    if (this.isModified('registrationDetails.signupDetails.password')) {
        this.registrationDetails.signupDetails.password = await bcrypt.hash(this.registrationDetails.signupDetails.password, 10);
    }
    next();
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
module.exports = Recruiter;
