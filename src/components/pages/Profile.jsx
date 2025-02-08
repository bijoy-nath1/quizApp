import React from "react";
import PropTypes from "prop-types";
import pic from "../../assets/profilePic.jpg"; // or .png depending on the actual file extension

function Profile({ isBlock }) {
  return (
    <div
      className={`${
        isBlock ? "block" : "hidden"
      } text-black bg-gradient-to-r from-violet-200 to-violet-300 w-[90%] h-full rounded-2xl flex flex-col items-center  `}
    >
      {" "}
      {/* add gradient bg to this div in the class name */}
      <div className="rounded-full  w-18 h-18 mt-4 border-violet-500 border-2 flex flex-col items-center">
        <img
          src={pic}
          alt="image not found"
          className="w-full h-full object-cover rounded-full"
        />
        <h1 className=" font-mono font-semibold text-black mt-2">Bijay</h1>
      </div>
    </div>
  );
}
Profile.propTypes = {
  isBlock: PropTypes.bool.isRequired,
};

export default Profile;
