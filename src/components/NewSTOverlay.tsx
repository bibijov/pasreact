import React, { useContext, useEffect, useState } from "react";
import "../styles/newSTOverlay.scss";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { autoSkola, UserData } from "../utils/types";
import { AppContext } from "../functions/AppProvider";
import { doc, setDoc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { korisniciRef, skoleRef } from "../utils/firebase";
import axios from "axios";

interface Props {
  setIsNewST: any;
}

export function NewSTOverlay(props: Props) {
  const { setIsNewST } = props;
  // const [skola, setSkola] = useState<autoSkola | null>(null);
  const [email, setEmail] = useState<string>("");
  const [ime, setIme] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const auth = getAuth();
  const { currentUser } = useContext(AppContext);

  useEffect(() => {
    // getDoc(doc(skoleRef, currentUserData.skola)).then((skolica) => {
    //   setSkola(skolica.data() as autoSkola);
    // });
  }, []);

  const dodajNovogPredavaca = async () => {
    // createUserWithEmailAndPassword(auth, email, "123456")
    //   .then(async (userCredential) => {
    //     const user = userCredential.user;
    //     const userData: UserData = {
    //       email: user.email as string,
    //       uid: user.uid,
    //       role: "schoolteacher",
    //       displayName: "",
    //       skola: currentUserData.skola,
    //     };
    //     await setDoc(doc(korisniciRef, user.uid), userData).then(async () => {
    //       setEmail("");
    //       setIsNewST(false);
    //       await updateDoc(doc(skoleRef, currentUserData.skola), {
    //         predavaci: arrayUnion(userData),
    //       });
    //     });
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });

    try {
      await axios.post("http://localhost:8000/api/kreirajkorisnika", {
        ime: ime,
        email: email,
        password: "digiauto",
        uloga: "schoolteacher",
        autoskola_id: currentUser?.autoskola_id,
      });
      alert("Uspesno dodat predavac!");
      setIsNewST(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="newSTOverlay">
      <div className="newSTBox">
        <h2>Dodajte novog predavača</h2>
        <input
          type="text"
          name="imePredavaca"
          id="imePredavaca"
          placeholder="Ime predavača"
          onChange={(e) => setIme(e.target.value)}
        />
        <input
          type="email"
          name="emailPredavača"
          id="emailPredavača"
          placeholder="Email predavača"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="buttonOptions">
          <button onClick={() => dodajNovogPredavaca()}>Potvrdi</button>
          <button onClick={() => setIsNewST(false)}>Odustani</button>
        </div>
      </div>
    </div>
  );
}
