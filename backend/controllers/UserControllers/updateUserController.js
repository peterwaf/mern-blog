// const User = require("../../models/User");
// const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});
const updateUser = async (req, res) => {
  try {
    const form = new formidable.IncomingForm({ multiples: true });
    // Wrap formidable parsing in a promise
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    
    const user = res.user; // Use the user found by the middleware
    const updatedFields = {};

    // Update fields if provided
    if (fields.firstName) {
      updatedFields.firstName = fields.firstName[0];
      user.firstName = updatedFields.firstName;
    }
    if (fields.lastName) {
      updatedFields.lastName = fields.lastName[0];
      user.lastName = updatedFields.lastName;
    }
    if (fields.email) {
      updatedFields.email = fields.email[0];
      user.email = updatedFields.email;
    }
    if (fields.password) {
      updatedFields.password = fields.password[0];
      user.password = updatedFields.password;
    }

    // Update image if provided
    if (files.profilePic && files.profilePic[0]) {
      const result = await cloudinary.uploader.upload(files.profilePic[0].filepath, {
        folder: "mern-blog/images/profilePics",
        resource_type: "image",
      });
      updatedFields.profilePic = result.secure_url;
      user.profilePic = updatedFields.profilePic;
    }
    

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({ updatedUser, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateUser };
