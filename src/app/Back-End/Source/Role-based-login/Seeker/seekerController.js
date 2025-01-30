const SeekerService = require('./seekerService');

// Controller for creating a Seeker
async function createSeekerController(req, res) {
  try {
      const SeekerData = req.body;
      const newSeeker = await SeekerService.createSeekerService(SeekerData);
      return res.status(201).json(newSeeker);
  } catch (error) {
      if (error.name === 'DuplicateError') {
          return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: `Error creating seeker: ${error.message}` });
  }
}

async function checkSeekerUsername(req, res) {
  try {
      const { userName } = req.body;
      await SeekerService.checkSeekerUsernameExists(userName);
      return res.status(200).json({ message: 'Username is available' });
  } catch (error) {
      return res.status(409).json({ message: 'Username already exists' });
  }
}

// Controller to check if email exists
async function checkSeekerEmail(req, res) {
  try {
      const { email } = req.body;
      await SeekerService.checkSeekerEmailExists(email);
      return res.status(200).json({ message: 'Email is available' });
  } catch (error) {
      return res.status(409).json({ message: 'Email already exists' });
  }
}

// Controller to get all Seekers
async function getAllSeekersController(req, res) {
    try {
        const seekers = await SeekerService.getAllSeekersService();
        return res.status(200).json(seekers);
    } catch (error) {
        return res.status(500).json({ message: `Error fetching seekers: ${error.message}` });
    }
}

// Controller to get a Seeker by ID
async function getSeekerByIdController(req, res) {
    const { id } = req.params;
    try {
        const seeker = await SeekerService.getSeekerByIdService(id);
        return res.status(200).json(seeker);
    } catch (error) {
        return res.status(500).json({ message: `Error fetching seeker: ${error.message}` });
    }
}

// Controller to update a Seeker
async function updateSeekerController(req, res) {
    const { id } = req.params;
    const updatedDetails = req.body;
    try {
        const updatedSeeker = await SeekerService.updateSeekerService(id, updatedDetails);
        return res.status(200).json(updatedSeeker);
    } catch (error) {
        return res.status(500).json({ message: `Error updating seeker: ${error.message}` });
    }
}

// Controller to delete a Seeker
async function deleteSeekerController(req, res) {
    const { id } = req.params;
    try {
        const message = await SeekerService.deleteSeekerService(id);
        return res.status(200).json({ message });
    } catch (error) {
        return res.status(500).json({ message: `Error deleting seeker: ${error.message}` });
    }
}

module.exports = {
    createSeekerController,
    checkSeekerUsername,
    checkSeekerEmail,
    getAllSeekersController,
    getSeekerByIdController,
    updateSeekerController,
    deleteSeekerController
};
