import React from "react";
import "../styles/quiztab.scss";
import { useNavigate } from "react-router";
interface Props {
  ime: string;
  opis: string;
  id: number;
}
const QuizTab = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="quizTab">
      <p>ID: {props.id}</p>
      <p>{props.ime}</p>
      <button onClick={() => navigate(`/quiz/${props.id}`)}>
        Pokreni kviz
      </button>
    </div>
  );
};

export default QuizTab;
