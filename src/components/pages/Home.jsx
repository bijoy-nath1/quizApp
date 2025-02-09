import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../lib/MyStore";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router";

function Home() {
  const { updateState } = useContext(MyContext);
  const [TradCategories, setTradCategories] = useState({});
  useEffect(() => {
    const fetchTraditionalDataCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        setTradCategories(data.trivia_categories);
      } catch (error) {
        console.error("Error fetching traditional categories:", error);
      }
    };
    fetchTraditionalDataCategories();
  }, []);
  const formattedName = (name) => name.replace(/\s+/g, "");

  const techTopics = ["Linux", "DevOps", "Docker"];

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
              <Link to={`/${topic}`}>
                <IoIosArrowDroprightCircle
                  size={40}
                  color="black"
                  onClick={() => {
                    updateState("topic", topic);
                  }}
                  className=" cursor-pointer transition-all duration-300 ease-in-out hover:shadow-neon hover:border-blue-500 hover:scale-97"
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
        {TradCategories && TradCategories.length > 0 ? (
          TradCategories.map((category) => {
            return (
              <div
                key={category.id}
                className="bg-gradient-to-b from-green-100 to-gray-200 rounded-3xl shadow-lg border border-gray-300   max-w-70 min-h-30  flex justify-between items-center pr-3 transition-all duration-300 ease-in-out hover:shadow-neon hover:border-blue-500 hover:scale-105"
              >
                <div className="flex flex-col justify-start  min-h-full max-w-10 pl-5 pt-5">
                  {" "}
                  <h1 className=" font-semibold text-black">{category.name}</h1>
                </div>
                <Link to={`/${formattedName(category.name)}/${category.id}`}>
                  <IoIosArrowDroprightCircle
                    size={40}
                    color="black"
                    onClick={() => {
                      updateState("category", category.id);
                    }}
                    className=" cursor-pointer transition-all duration-300 ease-in-out hover:shadow-neon hover:border-blue-500 hover:scale-97"
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
