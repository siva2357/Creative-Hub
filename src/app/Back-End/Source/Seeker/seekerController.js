const seekerService = require('./seekerService');


// Controller to create a recruiter
async function createSeekerController(req, res) {
    try {
        const seekerData = req.body;
        const newSeeker = await seekerService.createSeekerService(seekerData);
        return res.status(201).json(newSeeker);
    } catch (error) {
        return res.status(500).json({ message: `Error creating seeker: ${error.message}` });
    }
}

// Controller to check if full name exists
async function checkSeekerFullName(req, res) {
    try {
        const { fullName } = req.body;
        await seekerService.checkSeekerFullNameExists(fullName);
        return res.status(200).json({ message: 'Full name is available' });
    } catch (error) {
        return res.status(409).json({ message: 'Fullname already exists' });
    }
}

// Controller to check if username exists
async function checkSeekerUsername(req, res) {
    try {
        const { userName } = req.body;
        await seekerService.checkSeekerUsernameExists(userName);
        return res.status(200).json({ message: 'Username is available' });
    } catch (error) {
        return res.status(409).json({ message: 'Username already exists' });
    }
}

// Controller to check if email exists
async function checkSeekerEmail(req, res) {
    try {
        const { email } = req.body;
        await seekerService.checkSeekerEmailExists(email);
        return res.status(200).json({ message: 'Email is available' });
    } catch (error) {
        return res.status(409).json({ message:  'Email already exists' });
    }
}

module.exports = {
    createSeekerController,
    checkSeekerFullName,
    checkSeekerUsername,
    checkSeekerEmail
};
