import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import Home from "../components/pages/Home";
import Profile from "../components/pages/Profile/";
import { Routes, Route } from "react-router";

function Layout() {
  return (
    <>
      <div className="flex h-[100vh] w-full">
        <LeftSideBar />
        <div className="w-full h-full">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Layout;
