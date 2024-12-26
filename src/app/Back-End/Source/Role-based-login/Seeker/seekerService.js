const Seeker = require('./seekerModel');

class DuplicateError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DuplicateError';
    }
}


async function checkSeekerFullNameExists(fullName) {
    const existingFullName = await Seeker.findOne({
        'registrationDetails.signupDetails.fullName': fullName
    });
    if (existingFullName) {
        throw new DuplicateError('Full name already exists.');
    }
}

async function checkSeekerUsernameExists(userName) {
    const existingUsername = await Seeker.findOne({
        'registrationDetails.signupDetails.userName': userName
    });
    if (existingUsername) {
        throw new DuplicateError('Username already exists.');
    }
}

async function checkSeekerEmailExists(email) {
    const existingEmail = await Seeker.findOne({
        'registrationDetails.signupDetails.email': email
    });
    if (existingEmail) {
        throw new DuplicateError('Email already exists.');
    }
}

async function createSeekerService(SeekerData) {
    const { registrationDetails: { signupDetails } } = SeekerData;
    if (!signupDetails.fullName || !signupDetails.userName || !signupDetails.email) {
        throw new Error('All fields are required.');
    }

    await checkSeekerFullNameExists(signupDetails.fullName);
    await checkSeekerUsernameExists(signupDetails.userName);
    await checkSeekerEmailExists(signupDetails.email);
    const newSeeker = new Seeker(SeekerData);
    
    try {
        await newSeeker.validate(); // Validate schema
        await newSeeker.save();     // Save to the database
        return newSeeker;           // Return the Seeker instance
    } catch (error) {
        throw new Error(`Error saving Seeker: ${error.message}`);
    }
}

module.exports = {
    createSeekerService,
    checkSeekerFullNameExists,
    checkSeekerUsernameExists,
    checkSeekerEmailExists
};
