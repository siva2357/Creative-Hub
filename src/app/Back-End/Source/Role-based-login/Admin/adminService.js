const Admin = require('./adminModel');

// Default admin data
const defaultAdminData = {
    registrationDetails: {
        fullName: 'Admin',
        userName: 'Admin',
        email: 'Admin@gmail.com',
        password: 'Admin@123',
        profilePicture: {
            fileName: 'profile.jpg',
            url: 'https://firebasestorage.googleapis.com/v0/b/core-feat-446514-j7.firebasestorage.app/o/Creative-Hub%2FAdmin%2Fprofile%203.jpg?alt=media&token=3e2626d3-52b3-4fc7-97e1-797c8efec66e'
        }
    },
    role: 'admin'
};

// Service to create admin with predefined details if not exist
async function createAdminService() {
    const existingAdmin = await Admin.findOne({ 'registrationDetails.email': defaultAdminData.registrationDetails.email });

    // If no admin exists, create the default admin
    if (!existingAdmin) {
        const admin = new Admin(defaultAdminData);
        await admin.save();
        console.log('Default admin created.');
        return admin;
    } else {
        console.log('Default admin already exists.');
        return existingAdmin;
    }
}

// Service to find admin by username
async function findAdminByUsername(username) {
    return await Admin.findOne({ 'registrationDetails.userName': username });
}

module.exports = {
    createAdminService,
    findAdminByUsername
};
