import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import Home from "../components/pages/Home";
import Profile from "../components/pages/Profile/";
import { Routes, Route } from "react-router";
import IndvidualTopic from "../components/pages/IndvidualTopic";

function Layout() {
  return (
    <>
      <div className="flex min-h-screen">
        <LeftSideBar />
        <div className="w-full h-full">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="profile" element={<Profile />} />
            <Route path="/:topic" element={<IndvidualTopic />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Layout;
