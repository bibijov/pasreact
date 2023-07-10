import React, { useEffect, useState } from "react";
import "../styles/newUserOverlay.scss";
import { autoSkola } from "../utils/types";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { korisniciRef } from "../utils/firebase";

interface Props {
  autoSkole: Array<autoSkola>;
  setIsNewUser: any;
}

export function NewUserOverlay(props: Props) {
  const { autoSkole, setIsNewUser } = props;
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("schoolAdmin");
  const [skola, setSkola] = useState<string>("");
  const auth = getAuth();
  useEffect(() => {
    console.log(skola);
  }, [skola]);

  const dodajNovogKorisnika = async () => {
    createUserWithEmailAndPassword(auth, email, "123456")
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: user.email,
          uid: user.uid,
          role: role,
          skola: skola,
        };
        await setDoc(doc(korisniciRef, user.uid), userData).then(() => {
          setEmail("");
          setSkola("");
          setIsNewUser(false);
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="newUserOverlay">
      <div className="newUserBox">
        <h2>Dodajte novog korisnika</h2>
        <input
          type="email"
          name="emailKorisnika"
          id="emailKorisnika"
          placeholder="Email korisnika"
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          name="izborSkole"
          id="izborSkole"
          placeholder="Izaberite školu"
          onChange={(e) => setSkola(e.target.value)}
          defaultValue="Izaberite školu"
        >
          {autoSkole.map((skola) => {
            return <option value={skola.ime}>{skola.ime}</option>;
          })}
        </select>
        <select name="roleChoice" id="rolechoice" disabled>
          <option value="schoolAdmin">schoolAdmin</option>
          {/* <option value="schoolTeacher">schoolTeacher</option>
          <option value="schoolInstructor">schoolInstructor</option>
          <option value="student">student</option> */}
        </select>
        <div className="buttonOptions">
          <button onClick={() => dodajNovogKorisnika()}>Potvrdi</button>
          <button onClick={() => setIsNewUser(false)}>Odustani</button>
        </div>
      </div>
    </div>
  );
}
