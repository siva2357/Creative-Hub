const recruiterService = require('./recruiterService');

// Controller to create a recruiter
async function createRecruiterController(req, res) {
    try {
        const recruiterData = req.body;
        const newRecruiter = await recruiterService.createRecruiterService(recruiterData);
        return res.status(201).json(newRecruiter);
    } catch (error) {
        return res.status(500).json({ message: `Error creating recruiter: ${error.message}` });
    }
}

// Controller to check if full name exists
async function checkRecruiterFullName(req, res) {
    try {
        const { fullName } = req.body;
        await recruiterService.checkRecruiterFullNameExists(fullName);
        return res.status(200).json({ message: 'Full name is available' });
    } catch (error) {
        return res.status(409).json({ message: 'Fullname already exists' });
    }
}


// Controller to check if username exists
async function checkRecruiterUsername(req, res) {
    try {
        const { userName } = req.body;
        await recruiterService.checkRecruiterUsernameExists(userName);
        return res.status(200).json({ message: 'Username is available' });
    } catch (error) {
        return res.status(409).json({ message: 'Username already exists' });
    }
}

// Controller to check if email exists
async function checkRecruiterEmail(req, res) {
    try {
        const { email } = req.body;
        await recruiterService.checkRecruiterEmailExists(email);
        return res.status(200).json({ message: 'Email is available' });
    } catch (error) {
        return res.status(409).json({ message:  'Email already exists' });
    }
}

module.exports = {
    createRecruiterController,
    checkRecruiterFullName,
    checkRecruiterUsername,
    checkRecruiterEmail
};
