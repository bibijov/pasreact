import React, { useContext, useEffect, useState } from "react";
import { BiCommentDetail, BiLogOutCircle } from "react-icons/bi";
import "../styles/home.scss";
import { izloguj } from "../utils/firebase";
import { useNavigate } from "react-router";
import { AppContext } from "../functions/AppProvider";
import { Instruktor } from "../utils/types";
import axios from "axios";
import _ from "lodash";
import { BsPeopleFill } from "react-icons/bs";

interface Props {}

export function HomeSI(props: Props) {
  const navigate = useNavigate();
  const [nizInstruktora, setNizInstruktora] = useState<Array<Instruktor>>([]);
  const { currentUser, logOut } = useContext(AppContext);
  const [trenutniInstruktor, setTrenutniInstruktor] = useState<Instruktor>();
  async function dohvatanjeInstruktora() {
    try {
      axios.get("http://localhost:8000/api/v1/instruktors").then((response) => {
        setNizInstruktora(response.data.data);
        console.log("Uspesno dohvatanje instruktora");
        setTrenutniInstruktor(
          _.find(response.data.data, { korisnikID: currentUser?.id })
        );
        console.log(currentUser, response.data.data);
      });
    } catch (e) {
      console.log("Problem sa dohvatanjem instruktora", e);
    }
  }
  useEffect(() => {
    if (currentUser !== undefined) {
      dohvatanjeInstruktora();
    }
  }, [currentUser]);
  return (
    <>
      <div className="welcome">
        <h2>Dobro došli, {currentUser && currentUser?.ime}</h2>
        <h2>{/* {date.getDate()}.{mesec}.{date.getFullYear()} */}</h2>
      </div>
      <div className="optionsContainer">
        <div
          className="option"
          onClick={() => {
            logOut();
            navigate("/");
          }}
        >
          <BiLogOutCircle color="white" size={100} />
          <h3>Izlogujte se</h3>
        </div>
        <div
          className="option"
          onClick={() => navigate(`/allUpits/${trenutniInstruktor?.id}`)}
        >
          <BiCommentDetail color="white" size={100} />
          <h3>Vasi upiti</h3>
        </div>
        <div className="option" onClick={() => navigate(`/random`)}>
          <BsPeopleFill color="white" size={100} />
          <h3>Random ljudi </h3>
        </div>
      </div>
    </>
  );
}
