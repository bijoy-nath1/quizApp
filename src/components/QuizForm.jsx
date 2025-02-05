import { useState } from "react";
import PropTypes from "prop-types";
import { FaRegCircle } from "react-icons/fa";

function QuizForm({ data }) {
  const [index, setIndex] = useState(0);

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

  return (
    <div className="h-[100vh] max-w-full flex justify-center items-center">
      <div className="h-[80%] w-[60%] flex-col">
        <div className="h-[10%] w-full flex justify-start items-end pl-5 pb-8">
          <h1 className="text-black font-medium text-lg">
            {index + 1}.{" "}
            {validQuestions[index]?.question
              ? validQuestions[index]?.question
              : data[index]?.question}
          </h1>
        </div>
        {data[index]?.answers ? (
          <div className="h-[100%] flex flex-col justify-start items-start pl-5 gap-3">
            {(() => {
              // Extract answers, remove null values, and limit to 4
              let answers = Object.values(validQuestions[index]?.answers || {})
                .filter((answer) => answer !== null)
                .slice(0, 4); // Ensuring max 4 answers are shown

              return answers?.map((answer, i) => (
                <div
                  key={i}
                  className="w-full h-[10%] border border-black rounded-lg flex justify-start items-center gap-3 pl-4 bg-blue-50 shadow-sm"
                >
                  <FaRegCircle color="black" />
                  <h1 className="text-black font-light">{answer}</h1>
                </div>
              ));
            })()}
            <div className="w-full h-[10%] flex justify-end items-center gap-3 pr-4">
              <button
                className="bg-blue-500 text-white rounded-lg px-6 py-2"
                onClick={() =>
                  setIndex((prev) => (prev + 1) % validQuestions.length)
                }
              >
                Next
              </button>
            </div>
          </div>
        ) : (
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
                  className="w-full h-[10%] border border-black rounded-lg flex justify-start items-center gap-3 pl-4 bg-blue-50 shadow-sm"
                >
                  <FaRegCircle color="black" />
                  <h1 className="text-black font-light">{answer}</h1>
                </div>
              ));
            })()}
            <div className="w-full h-[10%] flex justify-end items-center gap-3 pr-4">
              <button
                className="bg-blue-500 text-white rounded-lg px-6 py-2"
                onClick={() => setIndex((prev) => (prev + 1) % data?.length)}
              >
                Next
              </button>
            </div>
          </div>
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
