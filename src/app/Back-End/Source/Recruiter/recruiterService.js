const Recruiter = require('./recruiterModel');


// Custom error class for duplicate entries
class DuplicateError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DuplicateError';
    }
}


// Service to check if full name exists
async function checkRecruiterFullNameExists(fullName) {
    const existingFullName = await Recruiter.findOne({
        'registrationDetails.signupDetails.fullName': fullName
    });
    if (existingFullName) {
        throw new DuplicateError('Full name already exists.');
    }
}

// Service to check if username exists
async function checkRecruiterUsernameExists(userName) {
    const existingUsername = await Recruiter.findOne({
        'registrationDetails.signupDetails.userName': userName
    });
    if (existingUsername) {
        throw new DuplicateError('Username already exists.');
    }
}

// Service to check if email exists
async function checkRecruiterEmailExists(email) {
    const existingEmail = await Recruiter.findOne({
        'registrationDetails.signupDetails.email': email
    });
    if (existingEmail) {
        throw new DuplicateError('Email already exists.');
    }
}

// Service to create recruiter
async function createRecruiterService(recruiterData) {
    const { registrationDetails: { signupDetails } } = recruiterData;

    // Validate incoming data
    if (!signupDetails.fullName || !signupDetails.userName || !signupDetails.email) {
        throw new Error('All fields are required.');
    }

    // Validate uniqueness with separate functions
    await checkRecruiterFullNameExists(signupDetails.fullName);
    await checkRecruiterUsernameExists(signupDetails.userName);
    await checkRecruiterEmailExists(signupDetails.email);

    // Create recruiter instance
    const recruiter = new Recruiter(recruiterData);
    
    try {
        await recruiter.validate(); // Validate schema
        await recruiter.save();     // Save to the database
        return recruiter;           // Return the recruiter instance
    } catch (error) {
        throw new Error(`Error saving recruiter: ${error.message}`);
    }
}

module.exports = {
    createRecruiterService,
    checkRecruiterFullNameExists,
    checkRecruiterUsernameExists,
    checkRecruiterEmailExists
};
