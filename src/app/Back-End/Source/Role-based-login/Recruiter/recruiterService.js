const Recruiter = require('./recruiterModel');

class DuplicateError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DuplicateError';
    }
}

// Helper functions to check for duplicate username and email
async function checkRecruiterUsernameExists(userName) {
    const existingUsername = await Recruiter.findOne({ 'registrationDetails.userName': userName });
    if (existingUsername) {
        throw new DuplicateError('Username already exists.');
    }
}

async function checkRecruiterEmailExists(email) {
    const existingEmail = await Recruiter.findOne({ 'registrationDetails.email': email });
    if (existingEmail) {
        throw new DuplicateError('Email already exists.');
    }
}

// Create a new Recruiter
async function createRecruiterService(RecruiterData) {
  const { registrationDetails } = RecruiterData;

  // Validate incoming data
  if (!registrationDetails.userName || !registrationDetails.email || !registrationDetails.password) {
    throw new Error('All fields are required.');
}

  // Validate uniqueness with separate functions
  await checkRecruiterUsernameExists(registrationDetails.userName);
  await checkRecruiterEmailExists(registrationDetails.email);

  // Rename the variable to avoid conflict with the model name
  const newRecruiter = new Recruiter(RecruiterData);

  try {
      await newRecruiter.save();
      return newRecruiter;
  } catch (error) {
      throw new Error(`Error saving Recruiter: ${error.message}`);
  }
}


// Update an existing Recruiter
async function updateRecruiterService(id, updatedDetails) {
    try {
        const recruiter = await Recruiter.findByIdAndUpdate(id, { $set: updatedDetails }, { new: true });
        return recruiter;
    } catch (error) {
        throw new Error(`Error updating Recruiter: ${error.message}`);
    }
}

// Get all Recruiters
async function getAllRecruitersService() {
    try {
        const Recruiters = await Recruiter.find();
        return Recruiters;
    } catch (error) {
        throw new Error(`Error fetching Recruiters: ${error.message}`);
    }
}

// Get Recruiter by ID
async function getRecruiterByIdService(id) {
    try {
        const recruiter = await Recruiter.findById(id);
        if (!Recruiter) {
            throw new Error('Recruiter not found');
        }
        return recruiter;
    } catch (error) {
        throw new Error(`Error fetching Recruiter: ${error.message}`);
    }
}

// Delete Recruiter by ID
async function deleteRecruiterService(id) {
    try {
        const recruiter = await Recruiter.findByIdAndDelete(id);
        if (!recruiter) {
            throw new Error('Recruiter not found');
        }
        return 'Recruiter deleted successfully';
    } catch (error) {
        throw new Error(`Error deleting Recruiter: ${error.message}`);
    }
}

module.exports = {
    createRecruiterService,
    checkRecruiterUsernameExists,
    checkRecruiterEmailExists,
    updateRecruiterService,
    getAllRecruitersService,
    getRecruiterByIdService,
    deleteRecruiterService
};
