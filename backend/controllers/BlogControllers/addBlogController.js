const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const Blog = require("../../models/Blog"); // Adjust the path to your Blog model as needed

const addBlog = async (req, res, next) => {
  const form = new formidable.IncomingForm({ multiples: true });

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return next(err); // Handle form parsing error
      }

      const title = fields.title[0];
      const description = fields.description[0];
      const userId = fields.userId[0];
      const imagefilePath = files.image[0].filepath;

      try {
        const upload = await cloudinary.uploader.upload(imagefilePath, {
          folder: "mern-blog/images",
          resource_type: "image",
        });

        const blog = await Blog.create({
          title,
          description,
          image: upload.secure_url,
          userId,
          authorName: req.user.firstName + " " + req.user.lastName,
        });

        res.status(201).json({ blog, message: "Blog created successfully" });
      } catch (cloudinaryError) {
        res.status(400).json({ error: cloudinaryError.message });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addBlog };