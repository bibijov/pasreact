import React, { useContext, useState } from "react";
import "../styles/login.scss";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { redirect, useNavigate } from "react-router-dom";
// import axios from "../utils/axios";
import axios from "axios";
import { AppContext } from "../functions/AppProvider";

interface Props {}
axios.defaults.headers.common["X-CSRF-TOKEN"] = document
  ?.querySelector('meta[name="csrf-token"]')
  ?.getAttribute("content");

export function Login(props: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  // const auth = getAuth();
  // const [currentUser, setCurrentUser] = useState();
  // const createAccount = () => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       //Signed in
  //       const user = userCredential.user;
  //       console.log("Uspesno kreiran korisnik", user);
  //       redirect("/home");
  //     })

  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(error);
  //     });
  // };
  // const login = () => {
  //   const auth = getAuth();
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       //Signed in
  //       const user = userCredential.user;
  //       console.log("Uspesno ulogovan korisnik", user);
  //       console.log(auth);
  //       navigate("/home");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const { setCurrentUser } = useContext(AppContext);
  const handleLogin = async () => {
    // event.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/api/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          setCurrentUser(response.data);
          localStorage.setItem("korisnik", JSON.stringify(response.data));
        });
      setEmail("");
      setPassword("");
      navigate("/home");
    } catch (e) {
      console.log(e);
    }

    // try {
    //   await axios
    //     .get("http://localhost:8000/api/v1/autoskolas")
    //     .then((response) => {
    //       console.log(response.data);
    //     });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h2>Prijavite se</h2>

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="loginOptions">
          <button onClick={() => handleLogin()}>Prijavite se</button>
          {/* <button onClick={() => createAccount()}>Registrujte se</button> */}
        </div>
      </div>
    </div>
  );
}
