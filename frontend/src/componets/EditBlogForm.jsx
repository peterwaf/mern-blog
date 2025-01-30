/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState,useEffect } from "react";
import API from "../../api";

function EditBlogForm(props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    _id: props.selectedBlogId,
  });
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [previewImg, setPreviewImg] = useState(props.selectedBlog.image);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file" && e.target.files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
      setPreviewImg(URL.createObjectURL(e.target.files[0]))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (!formData.title || !formData.description || !formData.image) {
      toast.error("All fields are required");
      return;
    }
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image);
    data.append("blogId", formData._id);
    setLoadingIcon(true);
    try {
      const response = await axios.patch(
        `${API}/v1/blogs/update/`+formData._id,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      props.updateBlogItems(response.data.blog)
    } catch (error) {
      toast.error(error.response.data.error);
    }
    finally {
      setLoadingIcon(false);
      props.closeForm();
    }
  };

  useEffect(() => {
    if(props.selectedBlog){
      setFormData({
        title: props.selectedBlog.title,
        description: props.selectedBlog.description,
        image: props.selectedBlog.image,
        _id: props.selectedBlog._id,
      })
    }
  }, [props.selectedBlog]);

  
  
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
        <p className="text-2xl font-bold text-center">Edit Blog</p>
        <label htmlFor="title" className="font-bold">
          Title
        </label>
        <input
          name="title"
          className="p-2"
          type="text"
          placeholder="Enter Title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="description" className="font-bold">
          Description
        </label>
        <textarea
          name="description"
          className="p-2"
          placeholder="Enter Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="image" className="font-bold">
          Image
        </label>
        <div>
          {formData.image && (
            <img
              src={previewImg}
              className="text-left rounded w-24 h-auto object-cover"
            />
          )}
        </div>
        <input
          name="image"
          type="file"
          placeholder="Upload Image"
          onChange={handleChange}
        />
        <button onClick={handleSubmit} className="bg-black w-[200px] mx-auto rounded text-white p-2">
          Update
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

export default EditBlogForm;
