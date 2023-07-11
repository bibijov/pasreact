import React, { useState } from "react";
import "../styles/newschooloverlay.scss";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { skoleRef } from "../utils/firebase";
import axios from "axios";

interface Props {
  setIsNewSchool?: any;
}

export function NewSchoolOverlay(props: Props) {
  const { setIsNewSchool } = props;
  const [imeSkole, setImeSkole] = useState<string>("");
  const [emailAdmina, setEmailAdmina] = useState<string>("");
  const [adresaSkole, setAdresaSkole] = useState<string>("");
  const [brojTelefona, setBrojTelefona] = useState<string>("");
  const kreirajNovuSkolu = async () => {
    // if (imeSkole === "" || emailAdmina === "") {
    //   alert("Nije moguće uneti školu.");
    //   return;
    // }
    // const skolaData = {
    //   ime: imeSkole,
    //   emailAdmina: emailAdmina,
    // };
    // await setDoc(doc(skoleRef, imeSkole), skolaData);
    // setIsNewSchool(false);
    // setImeSkole("");
    // setEmailAdmina("");

    try {
      await axios
        .post("http://localhost:8000/api/v1/autoskolas", {
          ime: imeSkole,
          adresa: adresaSkole,
          brojtelefona: brojTelefona,
        })
        .then((response) => {
          console.log(response.data);
          alert("Uspesno dodata skola!");
          setIsNewSchool(false);
        });
    } catch (e) {
      console.log(e);
      alert("Nije uspesno.");
    }
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
          type="text"
          name="adresaSkole"
          id="adresaSkole"
          placeholder="Adresa škole"
          onChange={(e) => setAdresaSkole(e.target.value)}
        />
        <input
          type="text"
          name="brojTelefona"
          id="brojTelefona"
          placeholder="Broj telefona"
          onChange={(e) => setBrojTelefona(e.target.value)}
        />
        <div className="buttonOptions">
          <button onClick={() => kreirajNovuSkolu()}>Potvrdi</button>
          <button onClick={() => setIsNewSchool(false)}>Odustani</button>
        </div>
      </div>
    </div>
  );
}
