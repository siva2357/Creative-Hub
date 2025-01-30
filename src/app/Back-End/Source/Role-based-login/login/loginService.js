const bcrypt = require('bcrypt');
const Recruiter = require('../Recruiter/recruiterModel');
const Seeker = require('../Seeker/seekerModel');
const Admin = require('../Admin/adminModel');

// Helper function to check password and return user data
async function authenticateUser(userModel, email, password, role) {
  const user = await userModel.findOne({ 'registrationDetails.email': email });
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.registrationDetails.password);
    if (isPasswordValid) {
      return {
        id: user._id,
        role: role,
        username: user.registrationDetails.userName,
        email: user.registrationDetails.email,
        profile: user.registrationDetails.profilePicture,
      };
    }
  }
  return null;
}

// Main login service function
async function loginService(loginData) {
  const { email, password } = loginData;

  // Try to authenticate in each user type
  let user = await authenticateUser(Recruiter, email, password, 'recruiter');
  if (user) return user;

  user = await authenticateUser(Seeker, email, password, 'seeker');
  if (user) return user;

  user = await authenticateUser(Admin, email, password, 'admin');
  if (user) return user;

  // If no user is found in any model, throw error
  console.error(`Login failed for email: ${email}`);  // Ensure this is used only in development
  throw new Error('Invalid credentials');
}

module.exports = {
  loginService
};
