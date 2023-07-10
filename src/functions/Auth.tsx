import React, { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import firebase from "firebase/app";
interface IAuthContext {}

export const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
