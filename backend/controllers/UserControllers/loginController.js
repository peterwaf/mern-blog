const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const logIn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    //check if fields are present
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //check if user exists

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const from = "peterwafulah@gmail.com";
    const to = email;
    const subject = "Login successful";
    const text = `Hello ${user.firstName}, You have successfully logged in.`;
    const html = `<p>Hello ${user.firstName}, You have successfully logged in.</p>`;
    res.status(200).json({
      firstName: user.firstName,
      uid: user._id,
      token,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

module.exports = { logIn };
