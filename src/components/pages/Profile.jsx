import React from "react";
import PropTypes from "prop-types";

function Profile({ isBlock }) {
  return (
    <div className={`${isBlock === true ? "block" : "hidden"} text-black`}>
      Profile
    </div>
  );
}
Profile.propTypes = {
  isBlock: PropTypes.bool.isRequired,
};

export default Profile;
