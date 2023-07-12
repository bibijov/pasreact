import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Upit } from "../utils/types";
import UpitBox from "../components/UpitBox";
import _ from "lodash";
import { AppContext } from "../functions/AppProvider";

interface Props {}
const UpitList = (props: Props) => {
  const { korisnikID } = useParams();
  const [nizUpita, setNizUpita] = useState<Array<Upit>>([]);
  const { currentUser } = useContext(AppContext);
  async function dohvatanje() {
    try {
      await axios.get("http://localhost:8000/api/v1/upits").then((response) => {
        console.log("uslo u axios request", currentUser);
        if (currentUser?.uloga === "student") {
          setNizUpita(
            _.filter(response.data.data, {
              korisnik_id: parseInt(korisnikID as string),
            })
          );

          console.log("USPESNO DOHVATANE UPITA", nizUpita);
        }
        if (currentUser?.uloga === "schoolinstructor") {
          setNizUpita(
            _.filter(response.data.data, {
              instruktor_id: parseInt(korisnikID as string),
            })
          );
          console.log("USLO GDE TREBA", nizUpita);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (currentUser !== undefined) {
      dohvatanje();
    }
  }, [currentUser]);
  return (
    <div
      className="upitList"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h1>Spisak upita</h1>

      <p style={{ color: "white" }}>Zuta boja predstavlja stanje cekanja</p>
      <p style={{ color: "white" }}>Zelena boja predstavlja potvrdjen upit</p>
      <p style={{ color: "white" }}>Crvena boja predstavlja odbijen upit</p>
      <div
        className="upiti"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        {nizUpita?.map((upit) => {
          return (
            <UpitBox
              datum={upit.datum}
              id={upit.id}
              instruktor_id={upit.instruktor_id}
              korisnik_id={upit.korisnik_id}
              stanje={upit.stanje}
              vreme={upit.vreme}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UpitList;
