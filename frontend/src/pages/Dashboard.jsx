// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState, useEffect } from "react";
import AddBlogForm from "../componets/AddBlogForm";
import EditBlogForm from "../componets/EditBlogForm";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UserNav from "../componets/UserNav";
function Dashboard() {
  const [isAddBlogFormOpen, setIsAddBlogFormOpen] = useState(false);
  const [isEditBlogFormOpen, setIsEditBlogFormOpen] = useState(false);
  const [blogItems, setBlogItems] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState({});

  //track user

  //open and close add blog form

  const closeForm = () => {
    setIsAddBlogFormOpen(false);
    setIsEditBlogFormOpen(false);
  };

  useEffect(() => {
    const fetchBlogItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/blogs/all"
        );
        //filter blogs by user Id
        const userBlogs = response.data.filter(
          (blog) => blog.userId === localStorage.getItem("uid")
        );
        setBlogItems(userBlogs);
      } catch (error) {
        console.error("Error fetching blog items:", error);
      }
    };
    fetchBlogItems();
  }, []);

  //add blog Item to blog items
  const addblogItem = (blogItem) => {
    setBlogItems((prevItems) => [...prevItems, blogItem]);
  };

  //update blog items
  const updateBlogItems = (blogItem) => {
    setBlogItems((prevItems) =>
      prevItems.map((item) => (item._id === blogItem._id ? blogItem : item))
    );
  };

  //delete blog item
  const deleteBlog = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirm) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/blogs/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Blog deleted successfully");
        setBlogItems(blogItems.filter((item) => item._id != id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    } else {
      return;
    }
  };

  return (
    <div className="h-screen bg-[url('/images/pexels-pixabay-326055.jpg')] flex flex-col">
      <UserNav />
      <div className="bg-purple-400 text-center p-2 flex flex-row justify-center align-middle">
        <div className="flex flex-row gap-2">
          <Link to="/all" className="text-sm text-black font-bold p-1">
            All blogs
          </Link>
          <button
            onClick={() => setIsAddBlogFormOpen(true)}
            className="text-center text-xs   text-black font-bold w-[100px] border-white border-2 rounded"
          >
            Add Blog
          </button>
        </div>
      </div>

      {isAddBlogFormOpen && (
        <AddBlogForm
          addblogItem={addblogItem}
          updateBlogItems={updateBlogItems}
          closeForm={closeForm}
        />
      )}
      {isEditBlogFormOpen && (
        <EditBlogForm
          selectedBlog={selectedBlog}
          updateBlogItems={updateBlogItems}
          closeForm={closeForm}
        />
      )}

      <div className="bg-black bg-opacity-75 text-center p-2">
        <h2 className="text-sm text-white font-bold text-center">My Blogs</h2>
      </div>
      
        <div
          className="bg-white flex w-full flex-row align-middle justify-center mb-1"
      
        >
          <div className="w-2/12 p-1 flex flex-col justify-center align-middle">
          <p className="text-purple-500 font-bold line-clamp-3 text-sm/relaxed text-center">
             Image
            </p>
          </div>

          <div className="w-1/3 p-1 flex flex-col justify-center">
            <p className="text-purple-500 font-bold line-clamp-3 text-sm/relaxed text-center">
             Title
            </p>
          </div>

          <div className="w-2/12 p-1 flex flex-col justify-center">
            <p className="text-purple-500 font-bold line-clamp-3 text-sm/relaxed text-center">
              Description
            </p>
          </div>

          <div className="w-7/12 p-2 flex flex-col justify-center">
            <p className="text-purple-500 font-bold line-clamp-3 text-sm/relaxed text-center">
              Actions
            </p>
          </div>
          
          
        </div>
      
      {blogItems.map((blogItem) => (
        <div
          className="bg-white flex w-full flex-row align-middle justify-center mb-1"
          key={blogItem._id}
        >
          <div className="w-2/12 p-1 flex flex-col justify-center align-middle">
            <img
              className="w-full h-auto p-1 border-1 rounded-lg"
              src={blogItem.image}
              alt=""
            />
          </div>

          <div className="w-1/3 p-1 flex flex-col justify-center">
            <p className="text-black font-bold line-clamp-3 text-sm/relaxed">
              {blogItem.title}
            </p>
          </div>

          <div className="w-2/12 p-1 flex flex-col justify-center">
            <p className="text-black font-bold line-clamp-3 text-sm/relaxed">
              {blogItem.description.substring(0, 50) + "..."}
            </p>
          </div>

          <div className="w-2/12 p-2 flex flex-col justify-center">
            <button
              onClick={() => {
                setIsEditBlogFormOpen(true);
                setSelectedBlog(blogItem);
              }}
              className="text-center text-xs   text-black font-bold w-[100px] border-black border-2 rounded p-2"
            >
              Edit
            </button>
          </div>
          <div className="w-2/12 p-2 flex flex-col justify-center">
            <button
              onClick={() => deleteBlog(blogItem._id)}
              className="text-center text-xs   text-black font-bold w-[100px] border-black border-2 rounded p-2"
            >
              Delete
            </button>
          </div>
          <div className="w-2/12 p-2 flex flex-col justify-center">
            <a href={`/${blogItem.title}/more/${blogItem._id}`} className="text-center text-xs   text-black font-bold w-[100px] border-black border-2 rounded p-2">
              Readmore
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
