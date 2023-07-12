import React, { useContext, useState } from "react";
import "../styles/home.scss";
import { izloguj } from "../utils/firebase";
import { BiLogOutCircle } from "react-icons/bi";
import { GiBookshelf } from "react-icons/gi";
import { BsFillPersonPlusFill, BsPeopleFill } from "react-icons/bs";
import { NewSSOverlay } from "../components/NewSSOverlay";
import { AppContext } from "../functions/AppProvider";
import { NewQuizOverlay } from "../components/NewQuizOverlay";
import { useNavigate } from "react-router";
interface Props {}
export const quiz = {
  quizTitle: "React Quiz Component Demo",
  quizSynopsis:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
  nrOfQuestions: "4",
  questions: [
    {
      question:
        "How can you access the state of a component from inside of a member function?",
      questionType: "text",
      questionPic: "https://dummyimage.com/600x400/000/fff&text=X", // if you need to display Picture in Question
      answerSelectionType: "single",
      answers: [
        "this.getState()",
        "this.prototype.stateValue",
        "this.state",
        "this.values",
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
    {
      question: "ReactJS is developed by _____?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Google Engineers", "Facebook Engineers"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
    {
      question: "ReactJS is an MVC based framework?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["True", "False"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "10",
    },
    {
      question: "Which of the following concepts is/are key to ReactJS?",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "Component-oriented design",
        "Event delegation model",
        "Both of the above",
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "30",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      questionType: "photo",
      answerSelectionType: "single",
      answers: [
        "https://dummyimage.com/600x400/000/fff&text=A",
        "https://dummyimage.com/600x400/000/fff&text=B",
        "https://dummyimage.com/600x400/000/fff&text=C",
        "https://dummyimage.com/600x400/000/fff&text=D",
      ],
      correctAnswer: "1",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
    {
      question: "What are the advantages of React JS?",
      questionType: "text",
      answerSelectionType: "multiple",
      answers: [
        "React can be used on client and as well as server side too",
        "Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps",
        "React components have lifecycle events that fall into State/Property Updates",
        "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer",
      ],
      correctAnswer: [1, 2, 4],
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
  ],
};
export function HomeST(props: Props) {
  const [isNewSS, setIsNewSS] = useState<boolean>(false);
  const [isNewQuiz, setIsNewQuiz] = useState<boolean>(false);
  const date = new Date();
  const mesec = date.getMonth() + 1;
  const navigate = useNavigate();
  const { currentUser, logOut } = useContext(AppContext);

  return (
    <>
      <div className="welcome">
        <h2>Dobro došli, {currentUser && currentUser?.ime}</h2>
        <h2>
          {date.getDate()}.{mesec}.{date.getFullYear()}
        </h2>
      </div>
      <div className="optionsContainer">
        <div
          className="option"
          onClick={() => {
            logOut();
            navigate("/");
          }}
        >
          <BiLogOutCircle color="white" size={100} />
          <h3>Izlogujte se</h3>
        </div>
        <div className="option" onClick={() => setIsNewSS(true)}>
          <BsFillPersonPlusFill color="white" size={100} />
          <h3>Dodajte novog učenika</h3>
        </div>
        <div className="option" onClick={() => navigate("/newQuiz")}>
          <GiBookshelf color="white" size={100} />
          <h3>Napravite novi kviz</h3>
        </div>
        <div className="option" onClick={() => navigate("/allQuizs")}>
          <GiBookshelf color="white" size={100} />
          <h3>Svi kvizovi</h3>
        </div>
        <div className="option" onClick={() => navigate(`/random`)}>
          <BsPeopleFill color="white" size={100} />
          <h3>Random ljudi </h3>
        </div>
      </div>
      {isNewSS && <NewSSOverlay setIsNewSS={setIsNewSS} />}
      {isNewQuiz && <NewQuizOverlay setIsNewQuiz={setIsNewQuiz} />}
    </>
  );
}
