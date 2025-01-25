const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});
const updateBlog = async (req, res, next) => {
  try {
    const form = new formidable.IncomingForm({ multiples: true });

    // Wrap formidable parsing in a promise
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const blog = res.blog; // Use the blog found by the middleware
    const updatedFields = {};

    // Update fields if provided
    if (fields.title) {
      updatedFields.title = fields.title[0];
      res.blog.title = updatedFields.title;
    }
    if (fields.description) {
      updatedFields.description = fields.description[0];
      res.blog.description = updatedFields.description;
    }

    // Update image if provided
    if (files.image && files.image[0]) {
      const imageFilePath = files.image[0].filepath;

      try {
        const uploadResult = await cloudinary.uploader.upload(imageFilePath, {
          folder: "mern-blog/images",
          resource_type: "image",
        });
        updatedFields.image = uploadResult.secure_url;
        res.blog.image = updatedFields.image;
      } catch (cloudinaryError) {
        return res
          .status(400)
          .json({ error: "Image upload failed: " + cloudinaryError.message });
      }
    }

    // Save updated blog
    const updatedBlog = await blog.save();
    return res.status(200).json({
      blog: updatedBlog,
      message: "Blog updated successfully",
    });
  } catch (error) {
    return next(error); // Pass unexpected errors to the error handler
  }
};

module.exports = { updateBlog };
