import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [state, setState] = useState({
    correctAns: 0,
    testsCompleted: 0,

    Accuracy: 0,
    totalCoins: 0,
  });

  const updateState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <MyContext.Provider
      value={{
        state,
        updateState,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MyContext, MyProvider };
