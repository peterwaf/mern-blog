const Blog = require("../../models/Blog");
const getBlog = async (req, res) => {
    try {
      const blogId = req.params.id;
      const blog = await Blog.findById(blogId);
      res.status(200).json(blog);
    } catch (error) {
      res.status(400).json({ error: error.message, message: "Blog not found" });
    }
  }

module.exports = { getBlog };