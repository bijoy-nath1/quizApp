import { useState } from "react";
import PropTypes from "prop-types";
import { FaRegCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

function QuizForm({ data }) {
  const [index, setIndex] = useState(0);
  const [shouldSubmit, setSubmit] = useState(false);
  const navigate = useNavigate();
  // const [textColor,setTextColor]=useState

  // Filter out questions where the number of valid answers is less than 4
  const validQuestions = data.filter(
    (question) =>
      question.answers &&
      Object.values(question.answers).filter((a) => a !== null).length >= 4
  );

  // If there are no valid questions, show a message
  // if (validQuestions.length === 0) {
  //   return (
  //     <div className="h-[100vh] flex justify-center items-center">
  //       <h1 className="text-black font-medium text-lg">
  //         No valid questions available.
  //       </h1>
  //     </div>
  //   );
  // }

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
    event.preventDefault(); // Prevent default form submission

    if (shouldSubmit) {
      // Navigate after submission
      alert("test submitted successfully");
      navigate("/");
    } else {
      if (index + 1 < data.length) {
        setIndex((prev) => prev + 1);
      }

      if (index + 1 === data.length - 1) {
        setSubmit(true); // Enable submission after last question
      }
    }
  }

  return (
    <div className="h-[100vh] max-w-full flex justify-center items-center ">
      <div className="h-[80%] w-[60%] flex-col border   rounded-3xl p-12 shadow-2xl">
        <div className="h-[10%] w-full flex justify-start items-end  pb-8">
          <h1 className="text-violet-900 font-medium text-lg">
            {index + 1}.{" "}
            {validQuestions[index]?.question
              ? validQuestions[index]?.question
              : data[index]?.question}
          </h1>
        </div>
        {data[index]?.answers ? (
          <form onSubmit={handleFormSubmision} className=" h-full">
            <div className="h-[100%] flex flex-col justify-start items-start  gap-3">
              {(() => {
                // Extract answers, remove null values, and limit to 4
                let answers = Object.values(
                  validQuestions[index]?.answers || {}
                )
                  .filter((answer) => answer !== null)
                  .slice(0, 4); // Ensuring max 4 answers are shown

                return answers?.map((answer, i) => (
                  <div
                    key={i}
                    className="w-full h-[10%] border border-black rounded-4xl flex justify-start items-center gap-3 pl-4  shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:shadow-neon hover:bg-violet-300 hover:scale-95 hover:border-none "
                  >
                    <FaRegCircle color="black" />
                    <h1 className="text-black  w-full h-full flex items-center  hover:text-white font-bold ">
                      {answer}
                    </h1>
                  </div>
                ));
              })()}
              <div className="w-full h-[10%] flex justify-end items-center gap-3 pr-4">
                <button
                  className="bg-pink-100 text-black font-light rounded-lg px-6 py-2 shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:shadow-neon hover:bg-violet-300 hover:scale-95 hover:border-none "
                  type="submit"
                >
                  {shouldSubmit === false ? "Next" : "Submit"}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleFormSubmision} className=" h-full">
            <div className="h-[100%] flex flex-col justify-start items-start pl-5 gap-3">
              {(() => {
                const options = [];
                options.push(data[index]?.correct_answer);
                options.push(data[index]?.incorrect_answers[0]);
                options.push(data[index]?.incorrect_answers[1]);
                options.push(data[index]?.incorrect_answers[2]);

                return options.map((answer, i) => (
                  <div
                    key={i}
                    className="w-full h-[10%] border border-black rounded-4xl flex justify-start items-center gap-3 pl-4  shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:shadow-neon hover:bg-violet-300 hover:scale-95 hover:border-none "
                  >
                    <FaRegCircle color="black" />
                    <h1 className="text-black text-center w-full h-full flex items-center  hover:text-white font-bold ">
                      {answer}
                    </h1>
                  </div>
                ));
              })()}
              <div className="w-full h-[10%] flex justify-end items-center gap-3 pr-4">
                <button
                  className="bg-pink-100 text-black font-light rounded-lg px-6 py-2 shadow-sm cursor-pointer transition-all duration-300 ease-in-out hover:shadow-neon hover:bg-violet-300 hover:scale-95 hover:border-none "
                  type="submit"
                >
                  {shouldSubmit === false ? "Next" : "Submit"}
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
      answers: PropTypes.objectOf(PropTypes.string), // Case 1: 'answers' is an object
      correct_answer: PropTypes.string, // Case 2: 'correct_answer' exists
      incorrect_answers: PropTypes.arrayOf(PropTypes.string), // Case 2: 'incorrect_answers' is an array
    })
  ).isRequired,
};

export default QuizForm;
