import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../functions/AppProvider";
import { korisniciRef, skoleRef } from "../utils/firebase";
import { autoSkola, UserData } from "../utils/types";
import axios from "axios";
import _ from "lodash";

import "../styles/newSTOverlay.scss";
interface Props {
  setIsNewSI: any;
}

export function NewSIOverlay(props: Props) {
  const { setIsNewSI } = props;
  // const [skola, setSkola] = useState<autoSkola | null>(null);
  const [email, setEmail] = useState<string>("");
  const [auto, setAuto] = useState<string>("");
  const [ime, setIme] = useState<string>("");
  const [brojTelefona, setBrojTelefona] = useState<string>("");
  const { currentUser } = useContext(AppContext);
  useEffect(() => {
    // getDoc(doc(skoleRef, currentUserData.skola)).then((skolica) => {
    //   setSkola(skolica.data() as autoSkola);
    // });
  }, []);
  const dodajNovogInstruktora = async () => {
    // createUserWithEmailAndPassword(auth, email, "123456")
    //   .then(async (userCredential) => {
    //     const user = userCredential.user;
    //     const userData: UserData = {
    //       email: user.email as string,
    //       uid: user.uid,
    //       role: "schoolinstructor",
    //       displayName: "",
    //       skola: currentUserData.skola,
    //       voziAuto: auto,
    //     };
    //     await setDoc(doc(korisniciRef, user.uid), userData).then(async () => {
    //       setEmail("");
    //       setIsNewSI(false);
    //       await updateDoc(doc(skoleRef, currentUserData.skola), {
    //         instruktori: arrayUnion(userData),
    //       });
    //     });
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   });

    try {
      await axios
        .post("http://localhost:8000/api/kreirajkorisnika", {
          ime: ime,
          email: email,
          password: "digiauto",
          uloga: "schoolinstructor",
          autoskola_id: currentUser?.autoskola_id,
        })
        .then(async (response) => {
          try {
            await axios
              .get("http://localhost:8000/api/v1/users")
              .then((response) => {
                console.log(response.data);
                console.log(_.find(response.data.data, { email: email }));
                const korId = _.find(response.data.data, { email: email });
                try {
                  axios
                    .post("http://localhost:8000/api/v1/instruktors", {
                      ime: ime,
                      email: email,
                      brojtelefona: brojTelefona,
                      autoskola_id: currentUser?.autoskola_id,
                      korisnik_id: korId.id,
                      auto: auto,
                    })
                    .then((response) => {
                      alert("Uspesno dodat instruktor!");
                      setIsNewSI(false);
                    });
                } catch (e) {
                  console.log(e);
                }
              });
          } catch (e) {
            console.log(e);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="newSTOverlay">
      <div className="newSTBox">
        <h2>Dodajte novog instruktora</h2>
        <input
          type="text"
          name="imeInstruktora"
          id="imeInstruktora"
          placeholder="Ime instruktora"
          onChange={(e) => setIme(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="emailInstruktora"
          id="emailInstruktora"
          placeholder="Email instruktora"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="auto">Auto</label>
        <input
          type="text"
          name="auto"
          id="auto"
          placeholder="Auto"
          required
          onChange={(e) => setAuto(e.target.value)}
        />
        <label htmlFor="brTel">Broj telefona</label>
        <input
          type="text"
          name="brojTel"
          id="brojTel"
          placeholder="Broj telefona"
          onChange={(e) => setBrojTelefona(e.target.value)}
        />
        <div className="buttonOptions">
          <button onClick={() => dodajNovogInstruktora()}>Potvrdi</button>
          <button onClick={() => setIsNewSI(false)}>Odustani</button>
        </div>
      </div>
    </div>
  );
}
