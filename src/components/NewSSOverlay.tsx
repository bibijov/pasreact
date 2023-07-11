import React, { useContext, useEffect, useState } from "react";
import "../styles/newSTOverlay.scss";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { autoSkola, UserData } from "../utils/types";
import { AppContext } from "../functions/AppProvider";
import { doc, setDoc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { korisniciRef, skoleRef } from "../utils/firebase";

interface Props {
  setIsNewSS: any;
}

export function NewSSOverlay(props: Props) {
  const { setIsNewSS } = props;
  const [skola, setSkola] = useState<autoSkola | null>(null);
  const [email, setEmail] = useState<string>("");
  const [polozioT, setPolozioT] = useState<string>("da");
  const [brOdC, setBrOdC] = useState<number>(0);
  const auth = getAuth();
  const { currentUserData } = useContext(AppContext);
  useEffect(() => {
    // getDoc(doc(skoleRef, currentUserData.skola)).then((skolica) => {
    //   setSkola(skolica.data() as autoSkola);
    // });
  }, []);
  const dodajNovogStudenta = async () => {
    if (skola === null) return;

    // createUserWithEmailAndPassword(auth, email, "123456")
    //   .then(async (userCredential) => {
    //     const user = userCredential.user;
    //     const userData: UserData = {
    //       email: user.email as string,
    //       uid: user.uid,
    //       role: "student",
    //       displayName: "",
    //       skola: currentUserData.skola,
    //       brOdvozanihCasova: brOdC,
    //       polozioTeoriju: polozioT === "da" ? true : false,
    //     };
    //     await setDoc(doc(korisniciRef, user.uid), userData).then(async () => {
    //       setEmail("");
    //       setIsNewSS(false);
    //       await updateDoc(doc(skoleRef, currentUserData.skola), {
    //         studenti: arrayUnion(userData),
    //       });
    //     });
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });
  };
  return (
    <div className="newSTOverlay">
      <div className="newSTBox">
        <h2>Dodajte novog studenta</h2>
        <input
          type="email"
          name="emalStudenta"
          id="emalStudenta"
          placeholder="Email studenta"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="polozioTeoriju">Položio teoriju?</label>
        <select
          name="polozioTeoriju"
          id="polozioTeoriju"
          onChange={(e) => {
            setPolozioT(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="da">Da</option>
          <option value="ne">Ne</option>
        </select>
        <label htmlFor="brojOdvozanih">Broj odvozanih časova</label>
        <input
          type="number"
          name="brojOdvozanih"
          id="brojOdvozanih"
          placeholder="Broj odvozanih časova"
          required
          onChange={(e) => setBrOdC(parseInt(e.target.value))}
        />
        <div className="buttonOptions">
          <button onClick={() => dodajNovogStudenta()}>Potvrdi</button>
          <button onClick={() => setIsNewSS(false)}>Odustani</button>
        </div>
      </div>
    </div>
  );
}
