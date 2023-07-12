import React, { useContext, useState } from "react";
import "../styles/home.scss";
import { izloguj } from "../utils/firebase";
import { BiCommentAdd, BiCommentDetail, BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router";
import { AppContext } from "../functions/AppProvider";
import { GiBookshelf } from "react-icons/gi";
import NewUpit from "../components/NewUpit";
import { BsPeopleFill } from "react-icons/bs";
interface Props {}

export function HomeSS(props: Props) {
  const navigate = useNavigate();
  const { currentUser, logOut } = useContext(AppContext);
  const [isUpit, setIsUpit] = useState<boolean>(false);
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
          onClick={() => {
            setIsUpit(true);
          }}
        >
          <BiCommentAdd color="white" size={100} />
          <h3>Posaljite upit</h3>
        </div>
        <div className="option" onClick={() => navigate("/allQuizs")}>
          <GiBookshelf color="white" size={100} />
          <h3>Svi kvizovi</h3>
        </div>

        <div
          className="option"
          onClick={() => navigate(`/allUpits/${currentUser?.id}`)}
        >
          <BiCommentDetail color="white" size={100} />
          <h3>Vasi upiti</h3>
        </div>
        <div className="option" onClick={() => navigate(`/random`)}>
          <BsPeopleFill color="white" size={100} />
          <h3>Random ljudi </h3>
        </div>
      </div>
      {isUpit && <NewUpit setIsUpit={setIsUpit} />}
    </>
  );
}
