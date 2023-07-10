import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../functions/AppProvider";
import { korisniciRef, skoleRef } from "../utils/firebase";
import { autoSkola, UserData } from "../utils/types";
import "../styles/newSTOverlay.scss";
interface Props {
  setIsNewSI: any;
}

export function NewSIOverlay(props: Props) {
  const { setIsNewSI } = props;
  const [skola, setSkola] = useState<autoSkola | null>(null);
  const [email, setEmail] = useState<string>("");
  const [auto, setAuto] = useState<string>("");
  const auth = getAuth();
  const { currentUserData } = useContext(AppContext);
  useEffect(() => {
    getDoc(doc(skoleRef, currentUserData.skola)).then((skolica) => {
      setSkola(skolica.data() as autoSkola);
    });
  }, []);
  const dodajNovogInstruktora = async () => {
    if (skola === null) return;

    createUserWithEmailAndPassword(auth, email, "123456")
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userData: UserData = {
          email: user.email as string,
          uid: user.uid,
          role: "schoolinstructor",
          displayName: "",
          skola: currentUserData.skola,
          voziAuto: auto,
        };
        await setDoc(doc(korisniciRef, user.uid), userData).then(async () => {
          setEmail("");
          setIsNewSI(false);
          await updateDoc(doc(skoleRef, currentUserData.skola), {
            instruktori: arrayUnion(userData),
          });
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="newSTOverlay">
      <div className="newSTBox">
        <h2>Dodajte novog instruktora</h2>
        <input
          type="email"
          name="emalStudenta"
          id="emalStudenta"
          placeholder="Email instruktora"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="brojOdvozanih">Auto</label>
        <input
          type="text"
          name="auto"
          id="auto"
          placeholder="Auto"
          required
          onChange={(e) => setAuto(e.target.value)}
        />
        <div className="buttonOptions">
          <button onClick={() => dodajNovogInstruktora()}>Potvrdi</button>
          <button onClick={() => setIsNewSI(false)}>Odustani</button>
        </div>
      </div>
    </div>
  );
}
