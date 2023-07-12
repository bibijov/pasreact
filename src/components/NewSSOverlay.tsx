import React, { useContext, useEffect, useState } from "react";
import "../styles/newSTOverlay.scss";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { autoSkola, UserData } from "../utils/types";
import { AppContext } from "../functions/AppProvider";
import { doc, setDoc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { korisniciRef, skoleRef } from "../utils/firebase";
import axios from "axios";
import _ from "lodash";
interface Props {
  setIsNewSS: any;
}
interface Instruktor {
  id: number;
  ime: string;
  korisnik_id: number;
  autoskola_id: number;
  auto: string;
  brojtelefona: string;
}
export function NewSSOverlay(props: Props) {
  const { setIsNewSS } = props;
  // const [skola, setSkola] = useState<autoSkola | null>(null);
  const [email, setEmail] = useState<string>("");
  const [polozioT, setPolozioT] = useState<string>("da");
  const [brOdC, setBrOdC] = useState<number>(0);
  const [brNocnih, setBrNocnih] = useState<number>(0);
  const { currentUser } = useContext(AppContext);
  const [instruktori, setInstruktori] = useState<Array<Instruktor>>([]);
  const [izabraniInstruktor, setIzabraniInstruktor] = useState<number>(0);
  const [brojTelefona, setBrojTelefona] = useState<string>("");
  const [ime, setIme] = useState<string>("");
  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/instruktors").then((response) => {
      console.log(response.data.data);
      setInstruktori(response.data.data);
    });
  }, []);
  const dodajNovogStudenta = async () => {
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

    try {
      await axios
        .post("http://localhost:8000/api/kreirajkorisnika", {
          ime: ime,
          email: email,
          password: "digiauto",
          uloga: "student",
          autoskola_id: currentUser?.autoskola_id,
        })
        .then(async () => {
          try {
            await axios
              .get("http://localhost:8000/api/v1/users")
              .then((response) => {
                const korId = _.find(response.data.data, { email: email });
                try {
                  axios
                    .post("http://localhost:8000/api/v1/students", {
                      korisnik_id: korId.id,
                      autoskola_id: currentUser?.autoskola_id,
                      instruktor_id: izabraniInstruktor,
                      polozenateorija: polozioT,
                      brojcasovavoznje: brOdC,
                      brojnocnihvoznji: brNocnih,
                      brojtelefona: brojTelefona,
                      brojkredita: 0,
                    })
                    .then((response) => {
                      alert("Uspesno dodat student!");
                      setIsNewSS(false);
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
        <h2>Dodajte novog studenta</h2>
        <input
          type="text"
          name="ime"
          id="ime"
          placeholder="Ime"
          onChange={(e) => setIme(e.target.value)}
        />
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
          <option selected disabled>
            Polozena teorija?
          </option>
          <option value="da">Da</option>
          <option value="ne">Ne</option>
        </select>
        <input
          type="number"
          name="brojOdvozanih"
          id="brojOdvozanih"
          placeholder="Broj odvozanih časova"
          required
          onChange={(e) => setBrOdC(parseInt(e.target.value))}
        />
        <input
          type="text"
          name="brNocnih"
          id="brNocnih"
          placeholder="Broj odvozanih nocnih casova"
          onChange={(e) => setBrNocnih(parseInt(e.target.value))}
        />

        <select
          name="instruktorChoice"
          id="instruktorChoice"
          onChange={(e) => setIzabraniInstruktor(parseInt(e.target.value))}
        >
          <option disabled selected>
            Izaberite instruktora
          </option>
          {instruktori.map((instruktor) => {
            return <option value={instruktor.id}>{instruktor.ime}</option>;
          })}
        </select>

        <input
          type="text"
          name="brojTelefona"
          id="brojTelefona"
          placeholder="Broj telefona"
          onChange={(e) => setBrojTelefona(e.target.value)}
        />
        <div className="buttonOptions">
          <button onClick={() => dodajNovogStudenta()}>Potvrdi</button>
          <button onClick={() => setIsNewSS(false)}>Odustani</button>
        </div>
      </div>
    </div>
  );
}
