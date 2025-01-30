const RecruiterService = require('./recruiterService');

// Controller for creating a Recruiter
async function createRecruiterController(req, res) {
    try {
        const RecruiterData = req.body;
        const newRecruiter = await RecruiterService.createRecruiterService(RecruiterData);
        return res.status(201).json(newRecruiter);
    } catch (error) {
        if (error.name === 'DuplicateError') {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: `Error creating Recruiter: ${error.message}` });
    }
}

// Controller to check if username exists
async function checkRecruiterUsername(req, res) {
    try {
        const { userName } = req.body;
        await RecruiterService.checkRecruiterUsernameExists(userName);
        return res.status(200).json({ message: 'Username is available' });
    } catch (error) {
        return res.status(409).json({ message: 'Username already exists' });
    }
}

// Controller to check if email exists
async function checkRecruiterEmail(req, res) {
    try {
        const { email } = req.body;
        await RecruiterService.checkRecruiterEmailExists(email);
        return res.status(200).json({ message: 'Email is available' });
    } catch (error) {
        return res.status(409).json({ message: 'Email already exists' });
    }
}

// Controller to get all Recruiters
async function getAllRecruitersController(req, res) {
    try {
        const Recruiters = await RecruiterService.getAllRecruitersService();
        return res.status(200).json(Recruiters);
    } catch (error) {
        return res.status(500).json({ message: `Error fetching Recruiters: ${error.message}` });
    }
}

// Controller to get a Recruiter by ID
async function getRecruiterByIdController(req, res) {
    const { id } = req.params;
    try {
        const Recruiter = await RecruiterService.getRecruiterByIdService(id);
        return res.status(200).json(Recruiter);
    } catch (error) {
        return res.status(500).json({ message: `Error fetching Recruiter: ${error.message}` });
    }
}

// Controller to update a Recruiter
async function updateRecruiterController(req, res) {
    const { id } = req.params;
    const updatedDetails = req.body;
    try {
        const updatedRecruiter = await RecruiterService.updateRecruiterService(id, updatedDetails);
        return res.status(200).json(updatedRecruiter);
    } catch (error) {
        return res.status(500).json({ message: `Error updating Recruiter: ${error.message}` });
    }
}

// Controller to delete a Recruiter
async function deleteRecruiterController(req, res) {
    const { id } = req.params;
    try {
        const message = await RecruiterService.deleteRecruiterService(id);
        return res.status(200).json({ message });
    } catch (error) {
        return res.status(500).json({ message: `Error deleting Recruiter: ${error.message}` });
    }
}

module.exports = {
    createRecruiterController,
    checkRecruiterUsername,
    checkRecruiterEmail,
    getAllRecruitersController,
    getRecruiterByIdController,
    updateRecruiterController,
    deleteRecruiterController
};
