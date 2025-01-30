const { loginService } = require('./loginService');

async function loginController(req, res) {
  try {
      const loginData = req.body;
      const result = await loginService(loginData);

      // Return user data including the user ID
      return res.status(200).json({
          message: 'Login successful',
          id: result.id,  // ✅ Include the user ID in the response
          role: result.role,
          username: result.username,
          email: result.email,
          profile: result.profile
      });
  } catch (error) {
      return res.status(401).json({
          message: 'Invalid credentials',
          error: error.message
      });
  }
}


module.exports = {
    loginController
};
