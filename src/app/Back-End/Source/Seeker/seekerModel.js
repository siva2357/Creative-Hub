const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const seekerSchema = new Schema({
    registrationDetails: {
        signupDetails: {
            fullName: { type: String, required: true, unique: true },
            userName: { type: String, required: true, unique: true },
            email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
            password: { type: String, required: true },
        },
        profileDetails: {
            profilePicture: { type: String, required: true },
        },
    },
    role: { type: String, default: 'seeker' }
});

// Hash password before saving
seekerSchema.pre('save', async function(next) {
    if (this.isModified('registrationDetails.signupDetails.password')) {
        this.registrationDetails.signupDetails.password = await bcrypt.hash(this.registrationDetails.signupDetails.password, 10);
    }
    next();
});

const Seeker = mongoose.model('Seeker', seekerSchema);
module.exports = Seeker;
