const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    registrationDetails: {
        fullName: { type: String, required: true },
        userName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        profilePicture: { fileName: { type: String, required: true }, url: { type: String, required: true } }
    },
    role: { type: String, default: 'admin' }
});


adminSchema.pre('save', async function(next) {
    if (this.isModified('registrationDetails.password')) {
        this.registrationDetails.password = await bcrypt.hash(this.registrationDetails.password, 10);
    }
    next();
})

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
