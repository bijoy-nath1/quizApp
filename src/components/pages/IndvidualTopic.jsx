import { useParams } from "react-router";
import { useEffect, useState } from "react";
import QuizForm from "../QuizForm";

function IndividualTopic() {
  const [data, setData] = useState([]);
  const ApiKey = import.meta.env.VITE_QUIZ_API_KEY;
  const { name, id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (name && !id) {
          response = await fetch(
            `https://quizapi.io/api/v1/questions?apiKey=${ApiKey}&category=${name}`
          );
        } else if (name && id) {
          response = await fetch(
            `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=medium&type=multiple`
          );
        }

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const info = await response.json();
        setData(name && id ? info.results : info);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name, id, ApiKey]);

  // Debugging
  useEffect(() => {
    console.log("Updated Data:", data);
  }, [data]);

  return (
    <div>{data.length > 0 ? <QuizForm data={data} /> : <p>Loading...</p>}</div>
  );
}

export default IndividualTopic;
