import React, { useEffect, useState } from "react";
import "../styles/newUserOverlay.scss";
import { autoSkola } from "../utils/types";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { korisniciRef } from "../utils/firebase";
import axios from "axios";

interface Props {
  autoSkole: Array<autoSkola>;
  setIsNewUser: any;
}

export function NewUserOverlay(props: Props) {
  const { setIsNewUser } = props;
  const [autoSkole, setAutoSkole] = useState<Array<autoSkola>>([]);

  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("schoolAdmin");
  const [ime, setIme] = useState<string>("");
  const [skolaID, setSkolaID] = useState<string>("");
  // const auth = getAuth();
  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/autoskolas").then((response) => {
      console.log(response.data.data);
      setAutoSkole(response.data.data);
    });
  }, []);

  useEffect(() => {
    console.log(skolaID);
  }, [skolaID]);

  const dodajNovogKorisnika = async () => {
    // createUserWithEmailAndPassword(auth, email, "123456")
    //   .then(async (userCredential) => {
    //     const user = userCredential.user;
    //     const userData = {
    //       email: user.email,
    //       uid: user.uid,
    //       role: role,
    //       skola: skola,
    //     };
    //     await setDoc(doc(korisniciRef, user.uid), userData).then(() => {
    //       setEmail("");
    //       setSkola("");
    //       setIsNewUser(false);
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
        uloga: role,
        autoskola_id: parseInt(skolaID),
      });
      alert("Uspesno dodat korisnik!");
      setIsNewUser(false);
    } catch (e) {
      console.log(e);
    }
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
        <input
          type="text"
          name="imeKorisnika"
          id="imeKorisnika"
          onChange={(e) => setIme(e.target.value)}
          placeholder="Ime korisnika"
        />
        <select
          name="izborSkole"
          id="izborSkole"
          placeholder="Izaberite školu"
          onChange={(e) => setSkolaID(e.target.value)}
          // defaultValue="Izaberite školu"
        >
          <option disabled selected>
            Izaberite auto skolu
          </option>
          {autoSkole.map((skola) => {
            return <option value={skola.id}>{skola.ime}</option>;
          })}
        </select>
        <select
          name="roleChoice"
          id="rolechoice"
          onChange={(e) => setRole(e.target.value)}
        >
          <option disabled selected>
            Izaberite ulogu
          </option>
          <option value="schooladmin">schoolAdmin</option>
          <option value="schoolteacher">schoolTeacher</option>
          <option value="schoolinstructor">schoolInstructor</option>
          <option value="student">student</option>
        </select>
        <div className="buttonOptions">
          <button onClick={() => dodajNovogKorisnika()}>Potvrdi</button>
          <button onClick={() => setIsNewUser(false)}>Odustani</button>
        </div>
      </div>
    </div>
  );
}
