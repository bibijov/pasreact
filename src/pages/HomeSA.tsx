import React, { useContext, useState } from "react";
import { AppContext } from "../functions/AppProvider";
import "../styles/home.scss";
import { izloguj } from "../utils/firebase";
import { BiLogOutCircle } from "react-icons/bi";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineDriveEta } from "react-icons/md";
import { BsFillPersonPlusFill, BsPeopleFill } from "react-icons/bs";
import { NewSTOverlay } from "../components/NewSTOverlay";
import { NewSSOverlay } from "../components/NewSSOverlay";
import { NewSIOverlay } from "../components/NewSIOverlay";
import { redirect, useNavigate } from "react-router-dom";

interface Props {}

export function HomeSA(props: Props) {
  const [isNewST, setIsNewST] = useState<boolean>(false);
  const [isNewSI, setIsNewSI] = useState<boolean>(false);
  const [isNewSS, setIsNewSS] = useState<boolean>(false);
  const navigate = useNavigate();
  const date = new Date();
  const mesec = date.getMonth() + 1;
  const { currentUser, logOut } = useContext(AppContext);

  return (
    <>
      <div className="welcome">
        <h2>Dobro došli, {currentUser && currentUser?.ime}</h2>
        <h2>
          {date.getDate()}.{mesec}.{date.getFullYear()}
        </h2>
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
        <div className="option" onClick={() => setIsNewST(true)}>
          <GiTeacher color="white" size={100} />
          <h3>Dodajte novog predavača</h3>
        </div>
        <div className="option" onClick={() => setIsNewSI(true)}>
          <MdOutlineDriveEta color="white" size={100} />
          <h3>Dodajte novog instruktora</h3>
        </div>
        <div className="option" onClick={() => setIsNewSS(true)}>
          <BsFillPersonPlusFill color="white" size={100} />
          <h3>Dodajte novog učenika</h3>
        </div>
        <div className="option" onClick={() => navigate(`/random`)}>
          <BsPeopleFill color="white" size={100} />
          <h3>Random ljudi </h3>
        </div>
      </div>
      {isNewST && <NewSTOverlay setIsNewST={setIsNewST} />}
      {isNewSS && <NewSSOverlay setIsNewSS={setIsNewSS} />}
      {isNewSI && <NewSIOverlay setIsNewSI={setIsNewSI} />}
    </>
  );
}
