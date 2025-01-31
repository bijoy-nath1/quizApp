import React, { useState, useEffect } from "react";
import { Link } from "react-router"; // Ensure you're using react-router-dom
import logo from "../assets/OIP.jpeg";
import { GiTestTubes } from "react-icons/gi";
import { FaGithubAlt } from "react-icons/fa";
import { useLocation } from "react-router"; // useLocation from react-router-dom

function LeftSideBar() {
  const { pathname } = useLocation();

  // Determine icon color based on active route
  const getIconColor = (path) => (pathname === path ? "white" : "black");

  const routes = [
    { route: "Tests", path: "/", icon: <GiTestTubes /> },
    { route: "Profile", path: "/profile", icon: <FaGithubAlt /> },
  ];

  return (
    <div className="min-h-full min-w-64 flex flex-col items-center gap-2 shadow-2xl">
      <div className="mt-4 mb-8">
        <img src={logo} alt="Logo" className="w-14 h-10" />
      </div>
      <div className="flex flex-col items-center gap-3 min-w-64">
        {routes.map((item) => (
          <div
            key={item.route}
            className={`${
              pathname === item.path
                ? "bg-violet-800"
                : "bg-white border border-violet-800"
            } min-w-56 rounded-lg`}
          >
            <Link to={item.path} className="flex items-center gap-2 p-2">
              <span className={`text-xl text-${getIconColor(item.path)}`}>
                {React.cloneElement(item.icon, {
                  color: getIconColor(item.path),
                })}
              </span>
              <span
                className={`${
                  pathname === item.path ? "text-white" : "text-black"
                } text-xl`}
              >
                {item.route}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftSideBar;
