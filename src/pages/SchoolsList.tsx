import React, { useEffect, useState } from "react";
import "../styles/schoolsList.scss";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import axios from "axios";
import SchoolTab from "../components/SchoolTab";

interface Props {}
type autoSkola = {
  ime: string;
  adresa: string;
  brojtelefona: string;
  id: number;
};
export function SchoolsList(props: Props) {
  const [autoSkole, setAutoSkole] = useState<Array<autoSkola>>([]);

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
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    dohvatanje();
  }, []);
  return (
    <div className="schoolsList">
      <h1>Spisak auto škola</h1>
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
