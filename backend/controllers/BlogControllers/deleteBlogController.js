const Blog = require("../../models/Blog");
const cloudinary = require("cloudinary").v2;
const cloudinaryBuildUrl = require('cloudinary-build-url');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    // Delete the image from Cloudinary
    const publicId = cloudinaryBuildUrl.extractPublicId(blog.image);
    await cloudinary.uploader.destroy(publicId);
    res.status(200).json({ blog, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { deleteBlog };
