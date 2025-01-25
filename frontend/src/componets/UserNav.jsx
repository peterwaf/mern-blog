// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function UserNav() {
  const navigate = useNavigate();
  useEffect(() => {
    const loadUserInfo = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token && user) {
        setUserName(user);
      }
      if (!token || !user) {
        navigate("/login");
      }
    };
    loadUserInfo();
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const [userName, setUserName] = useState("");
  return (
    <div className="flex bg-black p-2 flex-row">
      <div className="flex flex-row w-1/2 justify-start">
        <h1 className="text-4xl text-white font-bold text-center">
          Hi ! {userName} <br />
        </h1>
      </div>
      <div className="flex flex-row justify-end w-1/2">
        <Link className="flex flex-col align-center justify-center text-center bg-purple-500 text-xs mx-2  text-white w-[100px] border-white border-2 rounded" to="/dashboard"> My dashboard </Link>
        <button
          onClick={handleLogout}
          className="text-center text-xs mx-2   text-white w-[100px] border-white border-2 rounded"
        >
          Log Out
        </button>
      </div>
    </div>



  );
}

export default UserNav;
