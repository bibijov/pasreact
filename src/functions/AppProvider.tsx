import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db, korisniciRef } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserData } from "../utils/types";

interface IAppContext {
  currentUser: User | undefined | null;
  currentUserData: UserData;
  logOut: any;
}

export const AppContext = createContext<IAppContext>({
  currentUser: undefined,
  currentUserData: {
    displayName: "",
    email: "",
    role: "globaladmin",
    skola: "",
    uid: "",
  },
  logOut: () => {},
});

const AppProvider = ({ children }: { children: any }) => {
  const b64DecodeUnicode = (str: string) => {
    return decodeURIComponent(
      atob(str).replace(/(.)/g, function (m, p) {
        let code = p.charCodeAt(0).toString(16).toUpperCase();
        if (code.length < 2) {
          code = "0" + code;
        }
        return "%" + code;
      })
    );
  };
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [currentUserData, setCurrentUserData] = useState<UserData>({
    displayName: "",
    email: "",
    role: "globaladmin",
    skola: "",
    uid: "",
  });
  const logOut = () => {
    setCurrentUser(null);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let currentUser = user;
        setCurrentUser(currentUser as User);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser !== null && currentUser !== undefined) {
      getDoc(doc(korisniciRef, currentUser.uid)).then((korisnik) => {
        setCurrentUserData(korisnik.data() as UserData);
      });
    }
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        logOut,
        currentUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
