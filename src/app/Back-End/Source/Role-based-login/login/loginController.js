const { loginService } = require('./loginService');

async function loginController(req, res) {
    try {
        const loginData = req.body;
        const result = await loginService(loginData);

        // Return user data including the role, username, and email
        return res.status(200).json({
            message: 'Login successful',
            role: result.role,
            username: result.username, // Send username to the frontend
            email: result.email, // Send email as well if needed
            profile:result.profile
        });
    } catch (error) {
        // Handle invalid credentials or errors
        return res.status(401).json({
            message: 'Invalid credentials',
            error: error.message
        });
    }
}

module.exports = {
    loginController
};
