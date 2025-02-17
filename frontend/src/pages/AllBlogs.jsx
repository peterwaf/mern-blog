/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import UserNav from "../componets/UserNav";
import { useEffect } from "react";
// for sanitizing html against xss
import DOMPurify from "dompurify";
import SearchForm from "../componets/SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blogsSlice";
import { displayDate } from "../functions/displayDate";

function AllBlogs() {
  const dispatch = useDispatch();
  const allBlogs = useSelector((state) => state.blogs.allBlogs);
  const isLoading = useSelector((state) => state.blogs.loading);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);
  

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
          <SearchForm />
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
                Created at : {displayDate(blog.createdAt)} | Written by :{" "}
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
    
        <h2 className="text-2xl text-center text-white">{isLoading ? "Loading ..." : ""} </h2>
      </div>
    </>
  );
}

export default AllBlogs;
