/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import UserNav from "../componets/UserNav";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../componets/Nav";

function ReadMore(props) {
  // eslint-disable-next-line no-unused-vars
  const { blogTitle, blogId } = useParams();
  const [blog, setBlog] = useState({});

  console.log(blog);

  const loadBlog = async () => {
    try {
      const blog = await axios.get(
        `http://localhost:5000/api/v1/blogs/${blogId}`
      );
      setBlog(blog.data);
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    loadBlog();
  });
  return (
    <div className="h-full">
      {localStorage.getItem("token") && <UserNav />}
      {!localStorage.getItem("token") && <Nav />}
    
        <article className=" hover:shadow-lg h-auto bg-white">
          <h1 className="text-4xl font-bold text-center py-4">{blog.title}</h1>
          <time className="block text-xs pb-4 text-center font-bold text-gray-500"> Created on : {props.displayDate(blog.createdAt)} | Written By : {blog.authorName} </time>
          <img
            alt=""
            src={blog.image}
            className="w-full h-auto px-2 "
          />

          <div className="bg-white p-2">
            
            <p className="mt-2 line-clamp-3 text-sm/relaxed">
              {blog.description}
            </p>
          </div>
        </article>
      
    </div>
  );
}

export default ReadMore;
