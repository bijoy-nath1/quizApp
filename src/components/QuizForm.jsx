import { FaRegCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useState } from "react";
import PropTypes from "prop-types";
import { MyContext } from "../lib/MyStore";
import { useContext } from "react";

function QuizForm({ data }) {
  const [index, setIndex] = useState(0);
  const [Correct, setCorrect] = useState(0);
  const [shouldSubmit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const { updateState, state } = useContext(MyContext);

  // Filter out questions where the number of valid answers is less than 4
  const validQuestions = data.filter(
    (question) =>
      question.answers &&
      Object.values(question.answers).filter((a) => a !== null).length >= 4
  );

  if (data[0].answers && validQuestions.length === 0) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <h1 className="text-black font-medium text-lg">
          No valid questions available.
        </h1>
      </div>
    );
  }

  function handleFormSubmision(event) {
    event.preventDefault();
    if (shouldSubmit) {
      const percent = (Correct / index + 1) * 100;
      updateState("Accuracy", Math.floor(percent));
      if (Correct === index + 1) {
        updateState("testsCompleted", state.testsCompleted + 1);
      }
      alert("Test submitted successfully");
      navigate("/");
    } else {
      if (index + 1 < data.length) {
        setIndex((prev) => prev + 1);
        setSelectedOption(null);
      }
      if (index + 1 === data.length - 1) {
        setSubmit(true);
      }
    }
  }

  function checkOption(optionKey) {
    if (selectedOption !== null) return;
    setSelectedOption(optionKey);
    let isCorrect =
      data[index]?.correct_answers?.[optionKey + "_correct"] === "true";
    if (isCorrect) {
      updateState("correctAns", state.correctAns + 1);
      updateState("totalCoins", state.totalCoins + 5);
      setCorrect((prev) => prev + 1);
    }
  }

  return (
    <div className="h-[100vh] max-w-full flex justify-center items-center">
      <div className=" w-96 m-8 flex-col border rounded-3xl p-12 shadow-2xl sm:w-[80%] md:w-[80%] lg:w-[50%] xl:w-[50%] 2xl:w-[50%] bg-white">
        <div className="h-[10%] w-full flex justify-start items-end pb-8">
          <h1 className="text-violet-900 font-medium text-lg">
            {index + 1}.{" "}
            {validQuestions[index]?.question || data[index]?.question}
          </h1>
        </div>
        {data[index]?.answers ? (
          <form onSubmit={handleFormSubmision} className="h-full">
            <div className="h-[100%] flex flex-col justify-start items-start gap-3">
              {Object.entries(validQuestions[index]?.answers || {})
                .filter(([answer]) => answer !== null)
                .slice(0, 4)
                .map(([key, answer]) => {
                  let isCorrect =
                    data[index]?.correct_answers[key + "_correct"] === "true";
                  let bgColor = "bg-white hover:bg-gray-300";

                  if (selectedOption !== null) {
                    if (key === selectedOption) {
                      bgColor = isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white";
                    } else if (isCorrect) {
                      bgColor = "bg-green-500 text-white";
                    }
                  }

                  return (
                    <div
                      key={key}
                      className={` w-full h-14 border border-black rounded-4xl flex justify-start items-center gap-3 pl-4 shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:shadow-neon hover:bg-violet-300 hover:scale-95 hover:border-none ${bgColor} overflow-hidden text-sm `}
                      onClick={() => checkOption(key)}
                    >
                      <FaRegCircle color="black" />
                      <h1 className="text-black  flex items-center hover:text-white font-bold truncate">
                        {answer}
                      </h1>
                    </div>
                  );
                })}
              <div className="w-full h-[10%] flex justify-end items-center gap-3 pr-4">
                <button
                  className="bg-pink-100 text-black font-light rounded-lg px-6 py-2 shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:shadow-neon hover:bg-violet-300 hover:scale-95 hover:border-none"
                  type="submit"
                >
                  {shouldSubmit ? "Submit" : "Next"}
                </button>
                {/*click of this next button previous bg and are showing */}
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleFormSubmision} className="h-full">
            <div className="h-[100%] flex flex-col justify-start items-start pl-5 gap-3">
              {(() => {
                return [
                  data[index]?.correct_answer,
                  ...(data[index]?.incorrect_answers || []),
                ].map((answer, i) => {
                  let isCorrect = answer === data[index]?.correct_answer;
                  let bgColor = "bg-white hover:bg-gray-300";

                  if (selectedOption !== null) {
                    if (answer === selectedOption) {
                      bgColor = isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white";
                    } else if (isCorrect) {
                      bgColor = "bg-green-500 text-white";
                    }
                  }

                  return (
                    <div
                      key={i}
                      className={`w-full h-14 border border-black rounded-4xl flex justify-start items-center gap-3 pl-4 shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:shadow-neon hover:bg-violet-300 hover:scale-95 hover:border-none ${bgColor}`}
                      onClick={() => {
                        setSelectedOption(answer);
                        if (isCorrect) {
                          updateState("correctAns", state.correctAns + 1);
                          updateState("totalCoins", state.totalCoins + 5);
                          setCorrect((prev) => prev + 1);
                        }
                      }}
                    >
                      <FaRegCircle color="black" />
                      <h1 className="text-black text-center w-full h-full flex items-center hover:text-white font-bold">
                        {answer}
                      </h1>
                    </div>
                  );
                });
              })()}
              <div className="w-full h-[10%] flex justify-end items-center gap-3 pr-4">
                <button
                  className="bg-pink-100 text-black font-light rounded-lg px-6 py-2 shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:shadow-neon hover:bg-violet-300 hover:scale-95 hover:border-none"
                  type="submit"
                >
                  {shouldSubmit ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

QuizForm.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answers: PropTypes.objectOf(PropTypes.string),
      correct_answer: PropTypes.string,
      correct_answers: PropTypes.objectOf(PropTypes.string),
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default QuizForm;
