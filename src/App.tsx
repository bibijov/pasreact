import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { PrivateRoute } from "./components/PrivateRoute";
import { AppContext } from "./functions/AppProvider";
import handleSubmit from "./functions/handlesubmit";
import logo from "./logo.svg";
import { Home } from "./pages/Home";
import { HomeSA } from "./pages/HomeSA";
import { HomeSI } from "./pages/HomeSI";
import { HomeSS } from "./pages/HomeSS";
import { HomeST } from "./pages/HomeST";
import { Login } from "./pages/Login";
import { SchoolsList } from "./pages/SchoolsList";
import "./styles/app.scss";
import NewQuiz from "./pages/NewQuiz";
import QuizList from "./pages/QuizList";
import QuizPage from "./pages/Quiz";

function App() {
  const [probni, setProbni] = useState<String>("");
  const { currentUser, currentUserData } = useContext(AppContext);

  useEffect(() => {
    console.log(probni);
  }, [probni]);
  function posalji() {
    handleSubmit(probni);
  }
  console.log("USER ROLE", currentUserData);
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" Component={Login} />
          <Route
            path="/home"
            element={
              currentUser === null ? (
                <Navigate to={{ pathname: "/" }} />
              ) : currentUser?.uloga === "schooladmin" ? (
                <HomeSA />
              ) : currentUser?.uloga === "schoolinstructor" ? (
                <HomeSI />
              ) : currentUser?.uloga === "schoolteacher" ? (
                <HomeST />
              ) : currentUser?.uloga === "student" ? (
                <HomeSS />
              ) : currentUser?.uloga === "globaladmin" ? (
                <Home />
              ) : (
                <p>User doesn't have a role</p>
              )
            }
          />
          <Route
            path="/schoolsList"
            element={
              currentUser !== null ? (
                <SchoolsList />
              ) : (
                <Navigate to={{ pathname: "/" }} />
              )
            }
          />
          <Route
            path="/newQuiz"
            element={
              currentUser !== null ? (
                <NewQuiz />
              ) : (
                <Navigate to={{ pathname: "/" }} />
              )
            }
          />
          <Route
            path="/allQuizs"
            element={
              currentUser !== null ? (
                <QuizList />
              ) : (
                <Navigate to={{ pathname: "/" }} />
              )
            }
          />
          <Route
            path="/quiz/:kvizId"
            element={
              currentUser !== null ? (
                <QuizPage />
              ) : (
                <Navigate to={{ pathname: "/" }} />
              )
            }
          />
        </Routes>
      </div>
      {!!currentUser && <Navigation />}
    </Router>
  );
}

export default App;
