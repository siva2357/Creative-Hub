const Seeker = require('./seekerModel');

// Custom error class for duplicate entries
class DuplicateError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DuplicateError';
    }
}


// Service to check if full name exists
async function checkSeekerFullNameExists(fullName) {
    const existingFullName = await Seeker.findOne({
        'registrationDetails.signupDetails.fullName': fullName
    });
    if (existingFullName) {
        throw new DuplicateError('Full name already exists.');
    }
}

// Service to check if username exists
async function checkSeekerUsernameExists(userName) {
    const existingUsername = await Seeker.findOne({
        'registrationDetails.signupDetails.userName': userName
    });
    if (existingUsername) {
        throw new DuplicateError('Username already exists.');
    }
}

// Service to check if email exists
async function checkSeekerEmailExists(email) {
    const existingEmail = await Seeker.findOne({
        'registrationDetails.signupDetails.email': email
    });
    if (existingEmail) {
        throw new DuplicateError('Email already exists.');
    }
}

// Service to create recruiter
async function createSeekerService(seekerData) {
    const { registrationDetails: { signupDetails } } = seekerData;

    // Validate incoming data
    if (!signupDetails.fullName || !signupDetails.userName || !signupDetails.email) {
        throw new Error('All fields are required.');
    }

    // Validate uniqueness with separate functions
    await checkSeekerFullNameExists(signupDetails.fullName);
    await checkSeekerUsernameExists(signupDetails.userName);
    await checkSeekerEmailExists(signupDetails.email);

    // Create recruiter instance
    const seeker = new Seeker(seekerData);
    
    try {
        await seeker.validate(); // Validate schema
        await seeker.save();     // Save to the database
        return seeker;           // Return the recruiter instance
    } catch (error) {
        throw new Error(`Error saving seeker: ${error.message}`);
    }
}

module.exports = {
    createSeekerService,
    checkSeekerFullNameExists,
    checkSeekerUsernameExists,
    checkSeekerEmailExists
};
