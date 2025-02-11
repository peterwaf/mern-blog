/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import UserNav from "../componets/UserNav";
import axios from "axios";
import { useState, useEffect } from "react";
import API from "../../api";
// for sanitizing html against xss
import DOMPurify from "dompurify";
import SearchForm from "../componets/SearchForm";

function AllBlogs(props) {
  const [allBlogs, setAllBlogs] = useState([]);
  const [resultMessage, setResultMessage] = useState("");

  const loadBlogs = async () => {
    try {
      const allBlogs = await axios.get(`${API}/v1/blogs/all`);
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


  const handleSearch = (searchText) => {
    if (searchText) {
      const filteredBlogs = allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchText.toLowerCase())||
        blog.description.toLowerCase().includes(searchText.toLowerCase())
      );
      setAllBlogs(filteredBlogs);
    } else {
      loadBlogs();
    }
  }

//track if any blog is found or not
  useEffect(() => {
    if (allBlogs.length > 0) {
      setResultMessage("");
    } else {
      setResultMessage("No Blogs Found");
    }
  }, [allBlogs]);
  return (
    <>
      <UserNav />

      <div className="sm:flex p-2">
        <div className="flex flex-col align-center items-center justify-center sm:w-1/2 p-2">
          <h1 className="text-4xl font-bold text-center text-white">
            All Blogs
          </h1>
        </div>
        <div className="flex flex-col align-center items-center justify-center sm:w-1/2 p-2">
          <SearchForm handleSearch={handleSearch} />
        </div>
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
                Created at : {props.displayDate(blog.createdAt)} | Written by :{" "}
                {blog.authorName}
              </time>

              <a href="#">
                <h3 className="mt-0.5 text-lg text-gray-900">{blog.title}</h3>
              </a>

              <div
                className="mt-2 line-clamp-3 text-sm/relaxed"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog.description.slice(0, 1000)),
                }}
              ></div>
              <span>
                <a
                  href={`${blog.title}/more/${blog._id}`}
                  className="text-purple-500 hover:underline font-bold"
                >
                  Read more..
                </a>
              </span>
            </div>
          </article>
        ))}
    
        <h2 className="text-2xl text-center text-white">{resultMessage} </h2>
      </div>
    </>
  );
}

export default AllBlogs;
