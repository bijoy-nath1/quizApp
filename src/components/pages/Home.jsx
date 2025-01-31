import React, { useContext, useEffect } from "react";
import { MyContext } from "../../lib/MyStore";
import { BiRightArrow } from "react-icons/bi";
import { IoIosArrowDroprightCircle } from "react-icons/io";

function Home() {
  const { state } = useContext(MyContext);
  useEffect(() => {
    console.log(state.data);
  }, [state]);

  const topics = [
    "Linux",
    " DevOps",
    "Networking",
    "Programming",
    "Cloud",
    "Docker",
    "Kubernetes",
  ];

  return (
    <div className=" w-full h-full ">
      <div className="min-h-40 w-full flex justify-start items-end p-10">
        <h1 className="text-black font-semibold text-2xl">Test Series</h1>
      </div>
      <div className="  grid grid-cols-4 gap-3 p-5">
        {topics.map((topic) => {
          return (
            <div
              key={topic}
              className="bg-gradient-to-b from-violet-200 to-gray-100 rounded-3xl shadow-lg border border-gray-300   max-w-70 min-h-30  flex justify-between items-center pr-3 transition-all duration-300 ease-in-out hover:shadow-neon hover:border-blue-500 hover:scale-105"
            >
              <div className="flex flex-col justify-start  min-h-full max-w-10 pl-5 pt-5">
                {" "}
                <h1 className=" font-semibold text-black">{topic}</h1>
              </div>
              <IoIosArrowDroprightCircle size={40} color="black" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
