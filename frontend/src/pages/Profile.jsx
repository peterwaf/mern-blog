// eslint-disable-next-line no-unused-vars
import React from "react";
import UserNav from "../componets/UserNav";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

function Profile() {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePic: "",
    bio: "",
    isVerified: false,
    uid: "",
  });
  const userId = localStorage.getItem("uid");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/${userId}`
        );
        setUserData(response.data);
        if (response.data.profilePic) {
          setPreviewImage(response.data.profilePic);
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    loadUserInfo();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file" && e.target.files[0]) {
      setUserData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.firstName || !userData.lastName || !userData.email) {
      toast.error("first name, last name and email are required");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("email", userData.email);
    formData.append("profilePic", userData.profilePic);
    formData.append("bio", userData.bio);
    setLoadingIcon(true);
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/users/update/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserData(response.data.user);
      toast.success(response.data.message);
      setIsEditProfile(false);
    } catch (error) {
      console.log(error.response.data.error);
    } finally {
      setLoadingIcon(false);
    }
  };

  console.log(userData);

  return (
    <>
      <UserNav />
      <div className="flex flex-col items-center justify-center m-2">
        <h1 className="text-4xl font-bold text-center pt-6 pb-6">My Profile</h1>
      </div>
      <div className="h-full flex flex-col items-center mb-6">
        <div
          className={`p-4 bg-black text-center text-white w-3/4 rounded opacity-85 ${
            isEditProfile && "hidden"
          }`}
        >
          <h2 className="font-bold">First Name</h2>
          <p className="p-2">{userData.firstName}</p>
          <h2 className="font-bold">Last Name</h2>
          <p className="p-2">{userData.lastName}</p>
          <h2 className="font-bold">Email</h2>
          <p className="p-2">{userData.email}</p>
          <h2 className="font-bold mb-2">Profile Picture</h2>
          {userData.profilePic ? (
            <img
              src={userData.profilePic}
              alt="Profile Picture"
              className="w-[200px] h-[200px] mx-auto"
            />
          ) : (
            <FaUserCircle className="w-[200px] h-[200px] mx-auto text-white pt-2" />
          )}
          <h2 className="font-bold p-2">Bio</h2>
          <p>{userData.bio?.length > 0 ? userData.bio : "No bio"}</p>
          <button
            onClick={() => setIsEditProfile(true)}
            className="bg-purple-500 rounded-lg px-4 py-2 mt-4 border-2 border-white"
          >
            Edit
          </button>
        </div>
        <div
          className={`p-4 bg-black text-center text-white w-3/4 rounded opacity-85 ${
            isEditProfile ? "block" : "hidden"
          }`}
        >
          <form onSubmit={handleSubmit} className="text-black">
            <div className="flex flex-col items-center mt-4">
              <label className="font-bold text-lg">First Name</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
                value={userData.firstName}
                name="firstName"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col items-center mt-4">
              <label className="font-bold text-lg">Last Name</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
                value={userData.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col items-center mt-4">
              <label className="font-bold text-lg">Email</label>
              <input
                type="email"
                className="border border-gray-300 rounded-lg px-4 py-2 mt-2"
                value={userData.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col items-center mt-4">
              <label className="font-bold text-lg text-white">
                Profile Picture
              </label>
              <input
                type="file"
                className="border border-gray-300 rounded-lg px-4 py-2 mt-2 text-white"
                name="profilePic"
                onChange={handleChange}
              />

              {previewImage && (
                <img
                  src={previewImage}
                  className="w-[100px] h-[100px] pt-2"
                  alt="Preview"
                />
              )}
            </div>
            <div className="flex flex-col items-center">
              <label className="font-bold text-lg text-white">Bio</label>
              <textarea
                className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-1/2"
                value={userData.bio}
                name="bio"
                onChange={handleChange}
              />
            </div>
            <img
              src="./images/loading.gif"
              className={`w-24 mx-auto rounded mt-4 ${
                loadingIcon ? "block" : "hidden"
              }`}
              alt=""
            />
            <button className="bg-purple-500 rounded-lg px-4 py-2 mt-4 border-2 border-white">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
