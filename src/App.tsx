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

function App() {
  const [probni, setProbni] = useState<String>("");
  const { currentUser, currentUserData } = useContext(AppContext);

  useEffect(() => {
    console.log(probni);
  }, [probni]);
  function posalji() {
    handleSubmit(probni);
  }
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
              ) : currentUserData.role === "schooladmin" ? (
                <HomeSA />
              ) : currentUserData.role === "schoolinstructor" ? (
                <HomeSI />
              ) : currentUserData.role === "schoolteacher" ? (
                <HomeST />
              ) : currentUserData.role === "student" ? (
                <HomeSS />
              ) : currentUserData.role === "globaladmin" ? (
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
        </Routes>
      </div>
      {!!currentUser && <Navigation />}
    </Router>
  );
}

export default App;
