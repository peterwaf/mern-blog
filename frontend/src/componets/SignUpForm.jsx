// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";
function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/v1/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Sign up successful");

      //remove previous logged in user token

      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      //remove previous logged in user

      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
      }

      //redirect to login

      navigate("/login");
      setError("");
    } catch (error) {
      toast.error(error.response.data.error);
      setError(error.response.data.error);
    }
  };
  return (
    <div
      id="signUP"
      className="flex flex-col justify-center align-center h-screen"
    >
      <div className="w-[400px] h-[400px] flex flex-col items-center bg-white rounded mx-auto">
        <form className="p-4" onSubmit={handleSubmit}>
          <h1 className="text-2xl text-center">Sign Up Form</h1>
          <br />
          <input
            name="firstName"
            type="text"
            className="mb-2 p-2 w-full border-b-2"
            placeholder="First Name"
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            type="text"
            className="mb-2 p-2 w-full border-b-2"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            className="mb-2 p-2 w-full border-b-2"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            className="p-2 mb-4 w-full border-b-2"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {error && (
            <div id="errorHolder" className="p-2">
              <span id="error" className="text-red-500">
                {error}
              </span>
            </div>
          )}
          <button className="bg-purple-800 text-white p-2 w-full rounded">
            Sign Up
          </button>
          <p className="pt-2 pb-2">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-800">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
