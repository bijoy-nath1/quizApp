import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Capitalize the context name
const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [state, setState] = useState({
    data: {},
    correctAns: 0,
    testsCompleted: 0,
    totalScore: 0,
    Accuracy: 0,
    totalCoins: 0,
  });

  const ApiKey = import.meta.env.VITE_QUIZ_API_KEY;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://quizapi.io/api/v1/questions?apiKey=${ApiKey}&category=Linux`
      );
      const data = await response.json();
      updateData(data);
    };
    fetchData();
  }, [ApiKey]);

  const updateData = (data) => {
    setState((prevState) => ({
      ...prevState,
      data,
    }));
  };

  const updateCorrectAns = (correctAns) => {
    setState((prevState) => ({
      ...prevState,
      correctAns,
    }));
  };

  const updateTestCompleted = (testsCompleted) => {
    setState((prevState) => ({
      ...prevState,
      testsCompleted,
    }));
  };

  const updateTotalScore = (totalScore) => {
    setState((prevState) => ({
      ...prevState,
      totalScore,
    }));
  };

  const updateAccuracy = (Accuracy) => {
    setState((prevState) => ({
      ...prevState,
      Accuracy,
    }));
  };

  const updateTotalCoins = (totalCoins) => {
    setState((prevState) => ({
      ...prevState,
      totalCoins,
    }));
  };

  return (
    <MyContext.Provider
      value={{
        state,
        updateData,
        updateAccuracy,
        updateCorrectAns,
        updateTotalCoins,
        updateTotalScore,
        updateTestCompleted,
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
