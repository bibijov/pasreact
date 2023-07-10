import React, { useContext, useEffect, useState } from "react";
import "../styles/home.scss";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../functions/Auth";
import { AppContext } from "../functions/AppProvider";
import { NewSchoolOverlay } from "../components/NewSchoolOverlay";
import { getDocs, collection } from "firebase/firestore";
import { db, izloguj } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { autoSkola } from "../utils/types";
import { NewUserOverlay } from "../components/NewUserOverlay";
interface Props {}

export function Home(props: Props) {
  const date = new Date();
  const mesec = date.getMonth() + 1;
  const { currentUser, currentUserData } = useContext(AppContext);
  const [isNewSchool, setIsNewSchool] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [autoSkole, setAutoSkole] = useState<Array<autoSkola>>([]);
  const navigate = useNavigate();

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
    <>
      {/* <h1>Početna</h1> */}
      <div className="welcome">
        <h2>Dobro došli, {currentUserData?.role}</h2>
        <h2>
          {date.getDate()}.{mesec}.{date.getFullYear()}
        </h2>
      </div>
      <div className="optionsContainer">
        <div className="option" onClick={() => setIsNewSchool(true)}>
          <h3>Nova škola</h3>
        </div>
        <div className="option" onClick={() => navigate("/schoolsList")}>
          <h3>Spisak škola</h3>
        </div>
        <div className="option" onClick={() => setIsNewUser(true)}>
          <h3>Novi korisnik</h3>
        </div>
        <div className="option" onClick={() => izloguj()}>
          <h3>Izlogujte se</h3>
        </div>
      </div>
      {isNewSchool && <NewSchoolOverlay setIsNewSchool={setIsNewSchool} />}
      {isNewUser && (
        <NewUserOverlay autoSkole={autoSkole} setIsNewUser={setIsNewUser} />
      )}
      <div className="schoolsList">
        {autoSkole.map((skola) => {
          return <p key={skola.ime}>{skola.ime}</p>;
        })}
      </div>
    </>
  );
}
