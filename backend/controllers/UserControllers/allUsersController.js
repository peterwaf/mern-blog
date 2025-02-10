const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    const displayUsers = users.map((user) => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        uid: user._id,
        profilePic: user.profilePic ? user.profilePic : "",
        bio: user.bio ? user.bio : "",
        isVerified: user.isVerified,
      };
    })
    res.status(200).json(displayUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {allUsers};
