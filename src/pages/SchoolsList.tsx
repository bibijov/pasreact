import React, { useEffect, useState } from "react";
import "../styles/schoolsList.scss";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../utils/firebase";

interface Props {}
type autoSkola = {
  ime: string;
  emailAdmina: string;
};
export function SchoolsList(props: Props) {
  const [autoSkole, setAutoSkole] = useState<Array<autoSkola>>([]);

  const dohvatanje = async () => {
    const querySnapshot = await getDocs(collection(db, "autoSkole"));
    const skole = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
    setAutoSkole(skole as Array<autoSkola>);
    console.log(skole);
  };
  useEffect(() => {
    dohvatanje();
  }, []);
  return (
    <div className="schoolsList">
      <h1>Spisak auto škola</h1>
      <div className="sList">
        {autoSkole.map((skola) => {
          return <p>{skola.ime}</p>;
        })}
      </div>
    </div>
  );
}
