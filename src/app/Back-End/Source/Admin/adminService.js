// adminService.js
const Admin = require('./adminModel');

// Service to create the admin with predefined details
async function createAdminService() {
    const adminData = {
        username: 'Admin',   // Set your predefined username
        email: 'Admin@gmail.com', // Set your predefined email
        password: 'Admin@123', // Set your predefined password
        profilePicture: 'https://res.cloudinary.com/dpp8aspqs/image/upload/v1713107223/Screenshot_2024-04-14_203418-removebg-preview_hg6usb.png', // Default profile picture
    };

    // Create and save the admin instance
    const admin = new Admin(adminData);
    await admin.save(); // Save to the database
    return admin;       // Return the admin instance
}

// Service to find admin by username
async function findAdminByUsername(username) {
    return await Admin.findOne({ username });
}

module.exports = {
    createAdminService,
    findAdminByUsername,
};
