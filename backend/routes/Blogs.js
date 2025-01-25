const express = require("express");
const Blog = require("../models/Blog");
const {authenticateUser} = require("../middlewares/authenticateUser");

// controllers

const { addBlog } = require("../controllers/BlogControllers/addBlogController");
const { updateBlog } = require("../controllers/BlogControllers/updateBlogController");
const {allBlogs} = require("../controllers/BlogControllers/allBlogsController");
const { getBlog } = require("../controllers/BlogControllers/getBlogController");
const { deleteBlog } = require("../controllers/BlogControllers/deleteBlogController");


//middlewares

const { findBlog } = require("../middlewares/findBlog");

//router

const router = express.Router();

//get all blogs

router.get("/api/v1/blogs/all",allBlogs);

//add blog

router.post("/api/v1/blogs/add",authenticateUser, addBlog);

//get by id

router.get("/api/v1/blogs/:id", getBlog);

//updateById

router.patch("/api/v1/blogs/update/:id",authenticateUser, findBlog, updateBlog);


//deleteById

router.delete("/api/v1/blogs/delete/:id", authenticateUser,deleteBlog);


module.exports = router;
