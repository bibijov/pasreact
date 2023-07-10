import React, { useState } from "react";
import "../styles/newschooloverlay.scss";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { skoleRef } from "../utils/firebase";
interface Props {
  setIsNewSchool?: any;
}

export function NewSchoolOverlay(props: Props) {
  const { setIsNewSchool } = props;
  const [imeSkole, setImeSkole] = useState<string>("");
  const [emailAdmina, setEmailAdmina] = useState<string>("");

  const kreirajNovuSkolu = async () => {
    if (imeSkole === "" || emailAdmina === "") {
      alert("Nije moguće uneti školu.");
      return;
    }
    const skolaData = {
      ime: imeSkole,
      emailAdmina: emailAdmina,
    };
    await setDoc(doc(skoleRef, imeSkole), skolaData);
    setIsNewSchool(false);
    setImeSkole("");
    setEmailAdmina("");
  };
  return (
    <div className="newSchoolOverlay">
      <div className="newSchoolBox">
        <h2>Dodajte novu školu</h2>
        <input
          type="text"
          name="imeSkole"
          id="imeSkole"
          placeholder="Ime škole"
          onChange={(e) => setImeSkole(e.target.value)}
        />
        <input
          type="email"
          name="adminEmail"
          id="adminEmail"
          placeholder="Email admina"
          onChange={(e) => setEmailAdmina(e.target.value)}
        />
        <div className="buttonOptions">
          <button onClick={() => kreirajNovuSkolu()}>Potvrdi</button>
          <button onClick={() => setIsNewSchool(false)}>Odustani</button>
        </div>
      </div>
    </div>
  );
}
