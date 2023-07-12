import React, { useContext, useEffect, useState } from "react";
import "../styles/upitBox.scss";
import { Instruktor, UserData } from "../utils/types";
import axios from "axios";
import _ from "lodash";
import { AppContext } from "../functions/AppProvider";

interface Props {
  id: number;
  stanje: string;
  datum: string;
  vreme: string;
  korisnik_id: number;
  instruktor_id: number;
}
const UpitBox = (props: Props) => {
  const { datum, id, instruktor_id, korisnik_id, stanje, vreme } = props;
  const [nizKorisnika, setNizKorisnika] = useState<Array<UserData>>([]);
  const [nizInstruktora, setNizInstruktora] = useState<Array<Instruktor>>([]);
  const { currentUser } = useContext(AppContext);
  console.log(instruktor_id);
  async function dohvatanjeKorisnika() {
    try {
      axios.get("http://localhost:8000/api/v1/users").then((response) => {
        setNizKorisnika(response.data.data);
        console.log("Uspesno dohvatanje korisnika");
      });
    } catch (e) {
      console.log("Problem sa dohvatanjem korisnika", e);
    }
  }
  async function dohvatanjeInstruktora() {
    try {
      axios.get("http://localhost:8000/api/v1/instruktors").then((response) => {
        setNizInstruktora(response.data.data);
        console.log("Uspesno dohvatanje instruktora");
      });
    } catch (e) {
      console.log("Problem sa dohvatanjem instruktora", e);
    }
  }
  useEffect(() => {
    dohvatanjeKorisnika();
    dohvatanjeInstruktora();
  }, []);
  async function prihvati() {
    try {
      axios
        .patch(`http://localhost:8000/api/v1/upits/${id}`, {
          stanje: "potvrdjen",
        })
        .then(() => {
          alert("Upit je prihvacen!");
          window.location.reload();
        });
    } catch (e) {
      console.log(e);
    }
  }
  async function odbij() {
    try {
      axios
        .patch(`http://localhost:8000/api/v1/upits/${id}`, {
          stanje: "odbijen",
        })
        .then(() => {
          alert("Upit je odbijen!");
          window.location.reload();
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div
      className="upitBox"
      style={{
        border:
          stanje === "cekanje"
            ? "3px solid yellow"
            : stanje === "potvrdjen"
            ? "3px solid green"
            : stanje === "odbijen"
            ? "3px solid red"
            : "3px solid white",
      }}
    >
      <p>Instruktor: {_.find(nizInstruktora, { id: instruktor_id })?.ime}</p>
      <p>Korisnik: {_.find(nizKorisnika, { id: korisnik_id })?.ime}</p>
      <p>Vreme:{vreme}</p>
      <p>Datum: {datum}</p>
      <p>ID Upita: {id}</p>
      {currentUser?.uloga === "schoolinstructor" && stanje === "cekanje" && (
        <div className="upitOptions">
          <button
            onClick={() => {
              prihvati();
            }}
          >
            Prihvati
          </button>
          <button
            onClick={() => {
              odbij();
            }}
          >
            Odbij
          </button>
        </div>
      )}
    </div>
  );
};

export default UpitBox;
