/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState,useEffect } from "react";
import API from "../../api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditBlogForm(props) {
  const [editorContent, setEditorContent] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [_id,set_Id] = useState("");
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [previewImg, setPreviewImg] = useState(props.selectedBlog.image);
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    const formData = {
      title: title,
      description: editorContent,
      image: image,
      _id: _id
    }
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
      setTitle(props.selectedBlog.title);
      setEditorContent(props.selectedBlog.description);
      setImage(props.selectedBlog.image);
      set_Id(props.selectedBlog._id);
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
        <p className="text-2xl font-bold text-center">Edit Blog</p>
        <label htmlFor="title" className="font-bold">
          Title
        </label>
        <input
          name="title"
          className="p-2"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description" className="font-bold">
          Description
        </label>
        {/* <textarea
          name="description"
          className="p-2"
          placeholder="Enter Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea> */}
        <ReactQuill
                  className="p-2 bg-white"
                  theme="snow"
                  name="description"
                  value={editorContent}
                  onChange={setEditorContent}
                />
        <label htmlFor="image" className="font-bold">
          Image
        </label>
        <div>
          {image && (
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
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreviewImg(URL.createObjectURL(e.target.files[0]));
          }}
        />
        <img
          src="./images/loading.gif"
          className={`w-24 mx-auto rounded ${loadingIcon ? "block" : "hidden"}`}
          alt=""
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
