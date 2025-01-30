const Seeker = require('./seekerModel');

class DuplicateError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DuplicateError';
    }
}

async function checkSeekerUsernameExists(userName) {
  const existingUsername = await Seeker.findOne({ 'registrationDetails.userName': userName });
  if (existingUsername) {
      throw new DuplicateError('Username already exists.');
  }
}

async function checkSeekerEmailExists(email) {
  const existingEmail = await Seeker.findOne({ 'registrationDetails.email': email });
  if (existingEmail) {
      throw new DuplicateError('Email already exists.');
  }
}

// Create a new Seeker
async function createSeekerService(SeekerData) {
  const { registrationDetails } = SeekerData;

  // Validate incoming data
  if (!registrationDetails.userName || !registrationDetails.email || !registrationDetails.password) {
      throw new Error('All fields are required.');
  }

  // Validate uniqueness
  await checkSeekerUsernameExists(registrationDetails.userName);
  await checkSeekerEmailExists(registrationDetails.email);

  const seeker = new Seeker(SeekerData);
  try {
      await seeker.save();
      return seeker;
  } catch (error) {
      throw new Error(`Error saving seeker: ${error.message}`);
  }
}

// Update an existing Seeker
async function updateSeekerService(id, updatedDetails) {
    try {
        const seeker = await Seeker.findByIdAndUpdate(id, { $set: updatedDetails }, { new: true });
        return seeker;
    } catch (error) {
        throw new Error(`Error updating seeker: ${error.message}`);
    }
}

// Get all Seekers
async function getAllSeekersService() {
    try {
        const seekers = await Seeker.find();
        return seekers;
    } catch (error) {
        throw new Error(`Error fetching seekers: ${error.message}`);
    }
}

// Get Seeker by ID
async function getSeekerByIdService(id) {
    try {
        const seeker = await Seeker.findById(id);
        if (!seeker) {
            throw new Error('Seeker not found');
        }
        return seeker;
    } catch (error) {
        throw new Error(`Error fetching seeker: ${error.message}`);
    }
}

// Delete Seeker by ID
async function deleteSeekerService(id) {
    try {
        const seeker = await Seeker.findByIdAndDelete(id);
        if (!seeker) {
            throw new Error('Seeker not found');
        }
        return 'Seeker deleted successfully';
    } catch (error) {
        throw new Error(`Error deleting seeker: ${error.message}`);
    }
}

module.exports = {
    createSeekerService,
    checkSeekerUsernameExists,
    checkSeekerEmailExists,
    updateSeekerService,
    getAllSeekersService,
    getSeekerByIdService,
    deleteSeekerService
};
