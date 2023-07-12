import React, { useContext, useEffect, useState } from "react";
import { Instruktor } from "../utils/types";
import axios from "axios";
import "../styles/newUpit.scss";
import { AppContext } from "../functions/AppProvider";
interface Props {
  setIsUpit: any;
}
const NewUpit = (props: Props) => {
  const { setIsUpit } = props;
  const [nizInstruktora, setNizInstruktora] = useState<Array<Instruktor>>([]);
  const [vremeDatum, setVremeDatum] = useState<Array<string>>([]);
  const [izabraniInstruktor, setIzabraniInstruktor] = useState<number>();
  const { currentUser } = useContext(AppContext);
  async function dohvatanjeInstruktora() {
    try {
      axios.get("http://localhost:8000/api/v1/instruktors").then((response) => {
        setNizInstruktora(response.data.data);
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    dohvatanjeInstruktora();
  }, []);

  useEffect(() => {
    console.log(vremeDatum);
  }, [vremeDatum]);

  async function posaljiUpit() {
    try {
      axios
        .post("http://localhost:8000/api/v1/upits", {
          korisnik_id: currentUser?.id,
          instruktor_id: izabraniInstruktor,
          stanje: "cekanje",
          datum: vremeDatum[0],
          vreme: vremeDatum[1],
        })
        .then(() => {
          alert("Uspesno poslat upit!");
          setIsUpit(false);
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="newUpit">
      <div className="newUpitBox">
        <h2>Posaljite upit</h2>
        <label htmlFor="izborInstruktora">Instruktor</label>
        <select
          name="izborInstruktora"
          id="izborInstruktora"
          onChange={(e) => setIzabraniInstruktor(parseInt(e.target.value))}
        >
          <option selected disabled>
            Izaberite instruktora
          </option>
          {nizInstruktora.map((ins) => {
            return <option value={ins.id}>{ins.ime}</option>;
          })}
        </select>
        <label htmlFor="vremeDatum">Vreme i datum</label>
        <input
          type="datetime-local"
          name="vremeDatum"
          id="vremeDatum"
          onChange={(e) => {
            setVremeDatum(e.target.value.split("T"));
          }}
        />
        <div className="buttonOptions">
          <button onClick={() => posaljiUpit()}>Posalji</button>
          <button onClick={() => setIsUpit(false)}>Odustani</button>
        </div>
      </div>
    </div>
  );
};

export default NewUpit;
