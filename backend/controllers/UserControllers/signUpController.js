const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const sendMail = require("../Functions/sendEmail");

const signUp = async (req, res) => {
  //email regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //check if all required fields are present
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  //check if email is valid

  if (!emailPattern.test(req.body.email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  //check if password is valid

  if (req.body.password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({ email });
    //check if user already exists
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    //create user

    const user = new User({ firstName, lastName, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ firstName, token });
    const from = "peterwafulah@gmail.com";
    const to = email;
    const subject = "Sign up successful";
    const text = `Hello ${firstName}, You have successfully signed up.`;
    const html = `<p>Welcome ${firstName}, You have successfully signed up.</p>`;
    await sendMail(from, to, subject, text, html);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signUp };
