const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        uid: user._id,
        profilePic: user.profilePic ? user.profilePic : "",
        bio: user.bio ? user.bio : "",
        isVerified: user.isVerified,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUser };
