const User = require("../../models/User");

const activateUserEmail = async (req, res) => {
    try {
        const userEmail = req.query.email;

        if (!userEmail) {
            return res.status(400).json({ error: "Email query parameter is required" });
        }

        // Find the user by email
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Activate the user
        user.isVerified = true;
        await user.save();
        res.redirect("http://localhost:5173/is-verified-success");
    } catch (error) {
        console.log(error.message);
        res.redirect("http://localhost:5173/is-verified-failed");
    }
};

module.exports = { activateUserEmail };
