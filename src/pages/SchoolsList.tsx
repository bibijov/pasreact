import React, { useEffect, useState } from "react";
import "../styles/schoolsList.scss";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import axios from "axios";
import SchoolTab from "../components/SchoolTab";
import _ from "lodash";

interface Props {}
type autoSkola = {
  ime: string;
  adresa: string;
  brojtelefona: string;
  id: number;
};
export function SchoolsList(props: Props) {
  const [autoSkole, setAutoSkole] = useState<Array<autoSkola>>([]);
  const [permSkole, setPermSkole] = useState<Array<autoSkola>>([]);
  const [filterID, setFilterID] = useState<string>();
  const dohvatanje = async () => {
    // const querySnapshot = await getDocs(collection(db, "autoSkole"));
    // const skole = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
    // setAutoSkole(skole as Array<autoSkola>);
    // console.log(skole);
    try {
      await axios
        .get("http://localhost:8000/api/v1/autoskolas")
        .then((response) => {
          console.log(response.data.data);
          setAutoSkole(response.data.data);
          setPermSkole(response.data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    dohvatanje();
  }, []);

  function sortRastuce() {
    const rastuci = _.sortBy(autoSkole, "ime");
    setAutoSkole(rastuci);
  }
  function sortOpadajuce() {
    const opadajuce = _.orderBy(autoSkole, "ime", "desc");
    setAutoSkole(opadajuce);
  }
  function pretrazi() {
    if (filterID === "") {
      setAutoSkole(permSkole);
    } else {
      const filtrirano = _.filter(autoSkole, {
        id: parseInt(filterID as string),
      });
      setAutoSkole(filtrirano);
    }
  }
  useEffect(() => {
    console.log(autoSkole);
  }, [autoSkole]);
  return (
    <div className="schoolsList">
      <h1>Spisak auto škola</h1>
      <button onClick={() => sortRastuce()}>Sortiraj po imenu rastuce</button>
      <button onClick={() => sortOpadajuce()}>
        Sortiraj po imenu opadajuce
      </button>
      <input
        type="text"
        placeholder="Pretrazite"
        onChange={(e) => setFilterID(e.target.value)}
      />
      <button onClick={() => pretrazi()}>Pretraga po ID</button>

      <div className="sList">
        {autoSkole.map((skola) => {
          return (
            <SchoolTab
              adresa={skola.adresa}
              ime={skola.ime}
              brojtelefona={skola.brojtelefona}
              id={skola.id}
            />
          );
        })}
      </div>
    </div>
  );
}
