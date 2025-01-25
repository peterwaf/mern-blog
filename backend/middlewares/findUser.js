const User = require("../models/User");
const jwt = require("jsonwebtoken");

const findUser = async (req, res, next) => {
  let selectedUser;
  try {
    const foundUser = await User.findById(req.params.id);
    selectedUser = foundUser;
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
  res.user = selectedUser;
  next();
};

module.exports = {findUser};
