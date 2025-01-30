/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import UserNav from "../componets/UserNav";
import axios from "axios";
import { useState, useEffect } from "react";
import API from "../../api";
function AllBlogs(props) {
  const [allBlogs, setAllBlogs] = useState([]);

  const loadBlogs = async () => {
    try {
      const allBlogs = await axios.get(
        `${API}/v1/blogs/all`
      );
      setAllBlogs(allBlogs.data);
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <>
      <UserNav />

      <div>
        <h1 className="text-4xl font-bold text-center pt-12 text-white">
          All Blogs
        </h1>
        <br />
      </div>

      <div className="flex flex-col items-center justify-center m-2">
        {allBlogs.map((blog) => (
          <article
            key={blog._id}
            className="flex flex-row w-full overflow-visible rounded-lg shadow transition hover:shadow-lg bg-white mb-2"
          >
            <img
              alt=""
              src={blog.image}
              className="h-56 w-1/4 object-cover float-left mr-2"
            />

            <div className="bg-white p-4 sm:p-6 w-3/4">
              <time className="block text-xs text-gray-500">
                {" "}
                Created at : {props.displayDate(blog.createdAt)}{" "} | Written by : {blog.authorName}
              </time>

              <a href="#">
                <h3 className="mt-0.5 text-lg text-gray-900">{blog.title}</h3>
              </a>

              <p className="mt-2 line-clamp-3 text-sm/relaxed">
                {blog.description.substring(0, 400)}
                <a
                  href={`${blog.title}/more/${blog._id}`}
                  className="text-purple-500 hover:underline px-2 font-bold"
                >
                  Read more..
                </a>
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default AllBlogs;
