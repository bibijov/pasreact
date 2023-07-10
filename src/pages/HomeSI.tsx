import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import "../styles/home.scss";
import { izloguj } from "../utils/firebase";

interface Props {}

export function HomeSI(props: Props) {
  return (
    <>
      <div className="welcome">
        {/* <h2>Dobro došli, {currentUserData && currentUserData?.role}</h2> */}
        <h2>{/* {date.getDate()}.{mesec}.{date.getFullYear()} */}</h2>
      </div>
      <div className="optionsContainer">
        <div className="option" onClick={() => izloguj()}>
          <BiLogOutCircle color="white" size={100} />
          <h3>Izlogujte se</h3>
        </div>
      </div>
    </>
  );
}
