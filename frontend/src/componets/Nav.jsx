// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../App.css";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

function Nav() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="bg-black w-screen text-white py-2">
      <nav className="flex items-center justify-between px-12 h-17">
        <a href="/" className="font-bold border-2 px-2 py-1 whitespace-nowrap">
          The Daily Chronicles
        </a>
        {/* Menu Section */}
        <div
          className={`${
            mobileMenu ? "flex" : "hidden"
          } absolute top-14 left-0 w-screen bg-[#0e0e0e] flex-col items-center gap-6 py-6 text-lg font-bold lg:static lg:flex lg:flex-row lg:justify-between lg:bg-none`}
        >
          <ul className="flex flex-col gap-6 items-center lg:flex-row lg:gap-8 px-5">
            {/* <li className="hover:text-orange-500">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:text-orange-500">
              <Link to="/contact">Contact Us</Link>
            </li> */}
          </ul>
          <div className="flex flex-col gap-6 items-center mt-4 lg:mt-0 lg:flex-row lg:gap-8">
            <button className="hover:text-orange-500">
              <Link to="/login">Log In</Link>
            </button>
            <button className="bg-orange-500 rounded-lg px-4 py-2">
              <Link to="/sign-up">Sign Up</Link>
            </button>
          </div>
        </div>
        {/* Hamburger Icon */}
        <div>
          <FaBars
            onClick={() => setMobileMenu(!mobileMenu)}
            className="font-bold text-2xl lg:hidden cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
}

export default Nav;
