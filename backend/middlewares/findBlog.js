const Blog = require("../models/Blog");

const findBlog = async (req, res, next) => {
    try {
      const foundBlog = await Blog.findById(req.params.id);
      if (!foundBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.blog = foundBlog;
      next();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

module.exports = {findBlog};