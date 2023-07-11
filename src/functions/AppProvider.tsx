import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db, korisniciRef } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserData } from "../utils/types";
import { redirect, useNavigate } from "react-router-dom";

interface IAppContext {
  currentUser: UserData | undefined | null;
  setCurrentUser: any;
  currentUserData: UserData | null;
  logOut: any;
}

export const AppContext = createContext<IAppContext>({
  currentUser: undefined,
  currentUserData: {
    ime: "",
    email: "",
    uloga: "globaladmin",
    autoskola_id: 0,
    id: 0,
    profilnaURL: "",
  },
  logOut: () => {},
  setCurrentUser: () => {},
});

const AppProvider = ({ children }: { children: any }) => {
  // const b64DecodeUnicode = (str: string) => {
  //   return decodeURIComponent(
  //     atob(str).replace(/(.)/g, function (m, p) {
  //       let code = p.charCodeAt(0).toString(16).toUpperCase();
  //       if (code.length < 2) {
  //         code = "0" + code;
  //       }
  //       return "%" + code;
  //     })
  //   );
  // };
  const [currentUser, setCurrentUser] = useState<UserData | null>();
  const [currentUserData, setCurrentUserData] = useState<UserData | null>({
    ime: "",
    email: "",
    uloga: "globaladmin",
    autoskola_id: 0,
    id: 0,
    profilnaURL: "",
  });
  const logOut = () => {
    localStorage.removeItem("korisnik");
  };

  useEffect(() => {
    if (currentUser === null || currentUser === undefined) {
      const storedObject = localStorage.getItem("korisnik");
      console.log("STAVLJENO");
      if (storedObject) {
        setCurrentUser(JSON.parse(storedObject));
        console.log("STAVLJENO");
      }
    }
  }, []);
  // useEffect(() => {
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     let currentUser = user;
  //     setCurrentUser(currentUser as User);
  //   } else {
  //     setCurrentUser(null);
  //   }
  // });
  // }, []);

  useEffect(() => {
    // if (currentUser !== null && currentUser !== undefined) {
    //   getDoc(doc(korisniciRef, currentUser.uid)).then((korisnik) => {
    //     setCurrentUserData(korisnik.data() as UserData);
    //   });
    // }
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logOut,
        currentUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
