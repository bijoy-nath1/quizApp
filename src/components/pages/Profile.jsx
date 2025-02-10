import React from "react";
import PropTypes from "prop-types";
import pic from "../../assets/profilePic.jpg"; // Ensure correct path
import { GrScorecard } from "react-icons/gr";
import { TiInputChecked } from "react-icons/ti";
import { FaTrophy } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { RiCoinsLine } from "react-icons/ri";
import { MyContext } from "../../lib/MyStore";
import { useContext } from "react";

function Profile({ isBlock }) {
  const { state } = useContext(MyContext);
  const score = 7;

  return (
    <div
      className={`${
        isBlock ? "block" : "hidden"
      } text-black bg-gradient-to-r from-violet-200 to-violet-300 w-[90%] h-fit rounded-2xl flex flex-col items-center p-4`}
    >
      {/* Profile Image */}
      <div className=" h-2 w-full flex justify-between items-center ">
        <button className=" flex justify-start items-center gap-2 px-2 py-1 cursor-pointer hover:bg-violet-200 rounded-lg">
          <CiLogout color="black" /> Log Out
        </button>
        <CiSettings color="black" size={22} className="cursor-pointer" />
      </div>
      <div className="w-20 h-20 mt-4 border-2 border-violet-500 rounded-full overflow-hidden">
        <img src={pic} alt="Profile" className="w-full h-full object-cover" />
      </div>

      {/* Profile Name */}
      <h1 className="font-mono font-semibold text-black mt-2">Bijay</h1>

      {/* Stats Grid */}
      <div className="w-full grid grid-cols-3 gap-4 mt-5">
        <div className="flex items-center gap-2">
          <GrScorecard size={23} color="blue" />
          <span className="text-blue-500 font-semibold font-sans ">
            {state.Accuracy}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <TiInputChecked size={35} color="green" />
          <span className="text-green-800 font-semibold font-sans">
            {state.correctAns}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaTrophy size={23} color="black" />
          <span className="text-cyan-800   font-semibold font-sans">
            {state.testsCompleted}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <RiCoinsLine size={25} color="orange" />
          <span className="text-orange-400 font-semibold font-sans">
            {state.totalCoins}
          </span>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  isBlock: PropTypes.bool.isRequired,
};

export default Profile;
