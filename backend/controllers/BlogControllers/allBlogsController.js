const Blog = require("../../models/Blog"); // Adjust the path to your Blog model as needed
const allBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = {allBlogs}