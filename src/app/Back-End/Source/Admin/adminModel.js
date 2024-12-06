// adminModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Define the Admin schema
const adminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    profilePicture: { type: String, required: true, default: 'path/to/default/profile/picture.jpg' }, // Default profile picture
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
