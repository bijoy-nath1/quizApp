import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import Home from "../components/pages/Home";
import { Routes, Route } from "react-router";
import IndividualTopic from "../components/pages/IndvidualTopic";

function Layout() {
  return (
    <>
      <div className="flex min-h-screen">
        <LeftSideBar />
        <div className="w-full h-full ">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/:name" element={<IndividualTopic />} />

            <Route path="/:name/:id" element={<IndividualTopic />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Layout;
