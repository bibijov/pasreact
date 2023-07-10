import React from "react";
import "../styles/home.scss";
import { izloguj } from "../utils/firebase";
import { BiLogOutCircle } from "react-icons/bi";
interface Props {}

export function HomeSS(props: Props) {
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
