/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddBlogForm(props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    userId: localStorage.getItem("uid"),
  });
  const [loadingIcon, setLoadingIcon] = useState(false);
  const handleChange = (e) => {
    if (e.target.type === "file" && e.target.files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      toast.error("All fields are required");
      return;
    }
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image);
    data.append("userId", formData.userId);
    setLoadingIcon(true);
    try {
      const response = await axios.post(
        "https://mern-blog-mc80czbuj-peters-projects-e5b89e4b.vercel.app/api/v1/blogs/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      props.addblogItem(response.data.blog);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoadingIcon(false);
      props.closeForm();
    }
    setFormData({
      title: "",
      description: "",
      image: "",
      userId: localStorage.getItem("uid"),
    });
  };
  return (
    <div
      id="blog-form-container"
      className="absolute top-0 w-screen h-screen bg-black bg-opacity-80"
    >
      <form
        onSubmit={handleSubmit}
        id="blog-form"
        className="bg-purple-400 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        flex flex-col gap-2 p-3 w-full sm:w-9/12"
      >
        <img
          src="./images/loading.gif"
          className={`w-24 mx-auto rounded ${loadingIcon ? "block" : "hidden"}`}
          alt=""
        />
        <p className="text-2xl font-bold text-center">Add Blog</p>
        <label htmlFor="title" className="font-bold">
          Title
        </label>
        <input
          name="title"
          className="p-2"
          type="text"
          placeholder="Enter Title"
          onChange={handleChange}
        />
        <label htmlFor="description" className="font-bold">
          Description
        </label>
        <textarea
          name="description"
          className="p-2"
          placeholder="Enter Description"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="image" className="font-bold">
          Image
        </label>
        <input
          name="image"
          type="file"
          placeholder="Upload Image"
          onChange={handleChange}
        />
        <button className="bg-black w-[200px] mx-auto rounded text-white p-2">
          Add
        </button>
        <button
          onClick={() => {
            props.closeForm();
          }}
          className="bg-black w-[200px] mx-auto rounded text-white p-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddBlogForm;
