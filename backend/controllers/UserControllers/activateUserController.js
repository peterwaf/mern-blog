const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const activateUserEmail = async (req, res) => {
    try {
        const token = req.query.token;
        if (!token) {
            return res.redirect("http://localhost:5173/is-verified-failed?error=missing_token");
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decodedToken.email;

        if (!userEmail) {
            return res.redirect("http://localhost:5173/is-verified-failed?error=invalid_token");
        }

        // Find the user
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.redirect("http://localhost:5173/is-verified-failed?error=user_not_found");
        }

        // If already verified, redirect
        if (user.isVerified) {
            return res.redirect("http://localhost:5173/is-verified-success?status=already_verified");
        }

        // Activate the user
        user.isVerified = true;
        await user.save();

        res.redirect("http://localhost:5173/is-verified-success?status=activated");
    } catch (error) {
        console.error("Activation Error:", error.message);

        // Token expired or malformed
        if (error.name === "TokenExpiredError") {
            return res.redirect("http://localhost:5173/is-verified-failed?error=token_expired");
        }
        if (error.name === "JsonWebTokenError") {
            return res.redirect("http://localhost:5173/is-verified-failed?error=invalid_token");
        }

        res.redirect("http://localhost:5173/is-verified-failed?error=unknown");
    }
};


module.exports = { activateUserEmail };
