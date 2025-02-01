import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../lib/MyStore";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router";

function Home() {
  const { state, changeCategory, changeTopic } = useContext(MyContext);
  const [TradCategories, setTradCategories] = useState({});
  useEffect(() => {
    setTradCategories(state.TradDataCategories);
    console.log(TradCategories.trivia_categories);
  }, []);

  const techTopics = ["Linux", " DevOps", "Docker"];

  return (
    <div className=" w-full h-full ">
      <div className="min-h-40 w-full flex justify-start items-end p-10">
        <h1 className="text-black font-semibold text-2xl">
          Technical Test Series
        </h1>
      </div>
      <div className="  grid grid-cols-4 gap-3 p-5">
        {techTopics.map((topic) => {
          return (
            <div
              key={topic}
              className="bg-gradient-to-b from-violet-200 to-gray-100 rounded-3xl shadow-lg border border-gray-300   max-w-70 min-h-30  flex justify-between items-center pr-3 transition-all duration-300 ease-in-out hover:shadow-neon hover:border-blue-500 hover:scale-105"
            >
              <div className="flex flex-col justify-start  min-h-full max-w-10 pl-5 pt-5">
                {" "}
                <h1 className=" font-semibold text-black">{topic}</h1>
              </div>
              <Link to={`/${topic.name}-questions`}>
                <IoIosArrowDroprightCircle
                  size={40}
                  color="black"
                  onClick={() => {
                    changeTopic(topic);
                  }}
                  className=" cursor-pointer"
                />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="min-h-40 w-full flex justify-start items-end p-10">
        <h1 className="text-black font-semibold text-2xl">
          Traditional Test Series
        </h1>
      </div>
      <div className="  grid grid-cols-4 gap-3 p-5">
        {TradCategories.trivia_categories &&
        TradCategories.trivia_categories.length > 0 ? (
          TradCategories.trivia_categories.map((category) => {
            return (
              <div
                key={category.id}
                className="bg-gradient-to-b from-green-100 to-gray-200 rounded-3xl shadow-lg border border-gray-300   max-w-70 min-h-30  flex justify-between items-center pr-3 transition-all duration-300 ease-in-out hover:shadow-neon hover:border-blue-500 hover:scale-105"
              >
                <div className="flex flex-col justify-start  min-h-full max-w-10 pl-5 pt-5">
                  {" "}
                  <h1 className=" font-semibold text-black">{category.name}</h1>
                </div>
                <Link to={`/${category.name}-questions`}>
                  <IoIosArrowDroprightCircle
                    size={40}
                    color="black"
                    onClick={() => {
                      changeCategory(category.id);
                    }}
                    className=" cursor-pointer"
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <h1>no data found</h1>
        )}
      </div>
    </div>
  );
}

export default Home;
