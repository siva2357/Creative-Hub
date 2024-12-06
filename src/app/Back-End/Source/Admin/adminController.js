// adminController.js
const adminService = require('./adminService');

// Controller to create the admin (this will only run once)
async function createAdminController(req, res) {
    try {
        const newAdmin = await adminService.createAdminService();
        return res.status(201).json(newAdmin);
    } catch (error) {
        return res.status(500).json({ message: `Error creating admin: ${error.message}` });
    }
}

// Controller for admin login
async function adminLoginController(req, res) {
    const { username, password } = req.body;

    try {
        const admin = await adminService.findAdminByUsername(username);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        return res.status(200).json({ message: 'Login successful', admin });
    } catch (error) {
        return res.status(500).json({ message: `Error during login: ${error.message}` });
    }
}

module.exports = {
    createAdminController,
    
};
