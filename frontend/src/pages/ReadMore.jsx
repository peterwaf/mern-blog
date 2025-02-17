/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import UserNav from "../componets/UserNav";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../componets/Nav";
import API from "../../api";
// for sanitizing html against xss
import DOMPurify from "dompurify";
import { displayDate } from "../functions/displayDate";

function ReadMore(props) {
  // eslint-disable-next-line no-unused-vars
  const { blogTitle, blogId } = useParams();
  const [blog, setBlog] = useState({});

  console.log(blog);

  const loadBlog = async () => {
    try {
      const blog = await axios.get(`${API}/v1/blogs/${blogId}`);
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
    <>
      {localStorage.getItem("token") && <UserNav />}
      {!localStorage.getItem("token") && <Nav />}

      <div className=" h-auto bg-white">
        <h1 className="text-4xl font-bold text-center py-4">{blog.title}</h1>
        <time className="block text-xs pb-4 text-center font-bold text-gray-500">
          {" "}
          Created on : {displayDate(blog.createdAt)} | Written By :{" "}
          {blog.authorName}{" "}
        </time>
        <img alt="" src={blog.image} className="w-full h-auto px-2 " />

        <div
          className="mt-2 p-2 text-sm/relaxed h-auto bg-white"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.description)
          }}
        ></div>
      </div>
    </>
  );
}

export default ReadMore;
