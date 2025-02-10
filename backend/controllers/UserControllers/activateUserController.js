// const User = require("../../models/User");
// const jwt = require("jsonwebtoken");
const activateUserEmail = async (req, res) => {
    try {
        const user = res.user; // Use the user found by the middleware
        const userEmail = req.query.email;
        if (user.email === userEmail) {
            user.isVerified = true;
            await user.save();
            res.status(200).json({ message: "User activated successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { activateUserEmail };
