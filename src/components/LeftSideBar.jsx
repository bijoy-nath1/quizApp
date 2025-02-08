import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router"; // Ensure you're using react-router-dom
import logo from "../assets/OIP.jpeg";
import { GiTestTubes } from "react-icons/gi";
import { FaGithubAlt } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useLocation } from "react-router"; // useLocation from react-router-dom
import Profile from "../components/pages/Profile/";

function LeftSideBar() {
  // Determine icon color based on active route
  const [rotated, setRotated] = useState(false);

  return (
    <div className=" max-w-64 flex flex-col items-center gap-2 shadow-2xl">
      <div className="mt-4 mb-8">
        <img src={logo} alt="Logo" className="w-14 h-10" />
      </div>
      <div className="flex flex-col items-center gap-3 min-w-64">
        <div className="bg-violet-800 min-w-56 rounded-lg">
          <Link to="/" className="flex items-center gap-2 p-2">
            <span className="text-xl">
              <GiTestTubes />
            </span>
            <span className="text-white font-semibold">Tests</span>
          </Link>
        </div>
        <div
          className=" min-w-56 rounded-lg flex items-center p-2 gap-2 border border-violet-900 cursor-pointer"
          onClick={() => setRotated(!rotated)}
        >
          <span className="text-xl">
            <FaGithubAlt color="black" />
          </span>
          <span className="text-black font-semibold">Profile</span>

          <span className="text-xl ml-24">
            <MdKeyboardArrowRight
              color="black"
              className="cursor-pointer transition-transform duration-500"
              style={{ transform: rotated ? "rotate(90deg)" : "rotate(0deg)" }}
            />
          </span>
        </div>
      </div>
      <Profile isBlock={rotated} />
    </div>
  );
}

export default LeftSideBar;
