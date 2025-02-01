import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Capitalize the context name
const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [state, setState] = useState({
    Techdata: {},
    tradData: {},
    correctAns: 0,
    testsCompleted: 0,
    totalScore: 0,
    Accuracy: 0,
    totalCoins: 0,
    topic: "",
    category: null,
    TradDataCategories: {},
  });

  const ApiKey = import.meta.env.VITE_QUIZ_API_KEY;
  useEffect(() => {
    // fetching Technical questions
    const fetchTechData = async () => {
      const response = await fetch(
        `https://quizapi.io/api/v1/questions?apiKey=${ApiKey}&category=${state.topic}`
      );
      const data = await response.json();
      console.log(data);
      updateTechData(data);
    };
    fetchTechData();
  }, [state.topic, ApiKey]);

  useEffect(() => {
    // fetching Traditional questions
    const fetchTraditionalData = async () => {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${state.category}&difficulty=medium&type=multiple`
      );
      const data = await response.json();
      console.log(data);
      updateTradData(data);
    };
    fetchTraditionalData();
  }, [state.category, ApiKey]);

  useEffect(() => {
    // fetching Traditional categories
    const fetchTraditionalDataCategorries = async () => {
      const response = await fetch(`https://opentdb.com/api_category.php`);
      const data = await response.json();
      updateTradDataCategories(data);
    };
    fetchTraditionalDataCategorries();
  }, [state.TradDataCategories, ApiKey]);

  const updateTradData = (tradData) => {
    setState((prevState) => ({
      ...prevState,
      tradData,
    }));
  };

  const updateTradDataCategories = (TradDataCategories) => {
    setState((prevState) => ({
      ...prevState,
      TradDataCategories,
    }));
  };

  const changeTopic = (topic) => {
    setState((prevState) => ({ ...prevState, topic }));
  };
  const changeCategory = (category) => {
    setState((prevState) => ({ ...prevState, category }));
  };
  const updateTechData = (Techdata) => {
    setState((prevState) => ({
      ...prevState,
      Techdata,
    }));
  };
  const updateTraditionalData = (tradData) => {
    setState((prevState) => ({
      ...prevState,
      tradData,
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
        updateTechData,
        updateAccuracy,
        updateCorrectAns,
        updateTotalCoins,
        updateTotalScore,
        updateTestCompleted,
        changeTopic,
        updateTraditionalData,
        changeCategory,
        updateTradData,
        updateTradDataCategories,
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
