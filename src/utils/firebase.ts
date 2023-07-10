// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  DocumentData,
  collection,
  CollectionReference,
  doc,
  updateDoc,
} from "firebase/firestore";
import { UserData } from "./types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfAhicJ_PmwaAAw24tdfyFjLFbdCxNLRE",
  authDomain: "pas1-64f21.firebaseapp.com",
  projectId: "pas1-64f21",
  storageBucket: "pas1-64f21.appspot.com",
  messagingSenderId: "891340102249",
  appId: "1:891340102249:web:fe1673c8d2c7ad446020f8",
  measurementId: "G-F7KP8WZVKX",
};

// Initialize Firebase
const appFb = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFb);

//init services
export const db = getFirestore();
export const auth = getAuth(appFb);

//Helper to create a collection ref with type for the data stored inside
const createCollection = <T = DocumentData>(collectionName: string) =>
  collection(db, collectionName) as CollectionReference<T>;

//realtime collection data
export const korisniciRef = collection(db, "korisnici");
export const skoleRef = collection(db, "autoSkole");

export const updateUserFirestore = (id: string, data: Partial<UserData>) =>
  updateDoc(doc(korisniciRef, id), data);

export const izloguj = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      //Sign-out succesful.
      console.log("Uspesno ste se izlogovali.");
    })
    .catch((error) => {
      console.log("Niste se uspesno izlogovali", error);
    });
};
