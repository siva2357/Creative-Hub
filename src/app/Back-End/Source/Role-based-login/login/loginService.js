const bcrypt = require('bcrypt');
const Recruiter = require('../Recruiter/recruiterModel');
const Seeker = require('../Seeker/seekerModel');
const Admin = require('../Admin/adminModel');

async function loginService(loginData) {
    const { email, password } = loginData;

    // Check recruiters database first
    let user = await Recruiter.findOne({ 'registrationDetails.basicDetails.email': email });
    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.registrationDetails.basicDetails.password);
        if (isPasswordValid) {
            // Return additional details like username
            return { 
                id: user._id, 
                role: 'recruiter', 
                username: user.registrationDetails.basicDetails.userName, // Assuming the Recruiter model contains a username
                email: user.registrationDetails.basicDetails.email,
                profile:user.registrationDetails.profileDetails.profilePicture, 
            };
        }
    }

    // If not found, check seekers database
    user = await Seeker.findOne({ 'registrationDetails.basicDetails.email': email });
    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.registrationDetails.basicDetails.password);
        if (isPasswordValid) {
            return { 
                id: user._id, 
                role: 'seeker', 
                username: user.registrationDetails.basicDetails.userName, // Assuming the Seeker model contains a username
                email: user.registrationDetails.basicDetails.email,
                profile:user.registrationDetails.profileDetails.profilePicture, 
            };
        }
    }

    // Check admin database
    user = await Admin.findOne({ 'email': email });
    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            return { 
                id: user._id, 
                role: 'admin', 
                username: user.username, // Assuming the Admin model contains a username
                email: user.email,
                profile:user.profilePicture 
            };
        }
    }

    // Log details for debugging purposes (avoid in production)
    console.error(`Login failed for email: ${email}`);
    
    throw new Error('Invalid credentials');
}

module.exports = {
    loginService
};
