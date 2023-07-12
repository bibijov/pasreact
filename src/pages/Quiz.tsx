import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../functions/AppProvider";
import axios from "axios";
import { Quiz } from "./QuizList";
import { useParams } from "react-router";

const QuizPage = () => {
  const [odgovor1, setOdgovor1] = useState<string>("");
  const [odgovor2, setOdgovor2] = useState<string>("");
  const [odgovor3, setOdgovor3] = useState<string>("");
  const [odgovor4, setOdgovor4] = useState<string>("");
  const [odgovor5, setOdgovor5] = useState<string>("");
  const [odgovor6, setOdgovor6] = useState<string>("");
  const [odgovor7, setOdgovor7] = useState<string>("");
  const [odgovor8, setOdgovor8] = useState<string>("");
  const [odgovor9, setOdgovor9] = useState<string>("");
  const [odgovor10, setOdgovor10] = useState<string>("");
  const { currentUser } = useContext(AppContext);
  const [datiKviz, setDatiKviz] = useState<Quiz>();
  const { kvizId } = useParams<string>();
  const [ocena, setOcena] = useState<number>(0);
  const [isProveren, setProveren] = useState<boolean>(false);
  async function dohvatanje() {
    try {
      await axios
        .get(`http://localhost:8000/api/v1/kvizs/${kvizId}`)
        .then((response) => {
          setDatiKviz(response.data.data);
        });
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    dohvatanje();
  }, []);
  function proveriResenje() {
    let i = 0;
    if (
      odgovor1.toLocaleLowerCase() === datiKviz?.odgovor1.toLocaleLowerCase()
    ) {
      setOcena(++i);
      console.log(i);
    }
    if (
      odgovor2.toLocaleLowerCase() === datiKviz?.odgovor2.toLocaleLowerCase()
    ) {
      setOcena(++i);
      console.log(i);
    }
    if (
      odgovor3.toLocaleLowerCase() === datiKviz?.odgovor3.toLocaleLowerCase()
    ) {
      setOcena(++i);
      console.log(i);
    }
    if (
      odgovor4.toLocaleLowerCase() === datiKviz?.odgovor4.toLocaleLowerCase()
    ) {
      setOcena(++i);
      console.log(i);
    }
    if (
      odgovor5.toLocaleLowerCase() === datiKviz?.odgovor5.toLocaleLowerCase()
    ) {
      setOcena(++i);
      console.log(i);
    }
    if (
      odgovor6.toLocaleLowerCase() === datiKviz?.odgovor6.toLocaleLowerCase()
    ) {
      setOcena(++i);
      console.log(i);
    }
    if (
      odgovor7.toLocaleLowerCase() === datiKviz?.odgovor7.toLocaleLowerCase()
    ) {
      setOcena(++i);
      console.log(i);
    }
    if (
      odgovor8.toLocaleLowerCase() === datiKviz?.odgovor8.toLocaleLowerCase()
    ) {
      setOcena(++i);
      console.log(i);
    }
    if (
      odgovor9.toLocaleLowerCase() === datiKviz?.odgovor9.toLocaleLowerCase()
    ) {
      setOcena(++i);
      console.log(i);
    }
    if (
      odgovor10.toLocaleLowerCase() === datiKviz?.odgovor10.toLocaleLowerCase()
    ) {
      setOcena(++i);
      console.log(i);
    }
    setProveren(true);
  }
  return (
    <>
      <h1>{datiKviz?.ime}</h1>
      <div className="noviKviz">
        <h2>{datiKviz?.pitanje1}</h2>
        <label htmlFor="prviodgovor">Odgovor 1</label>
        <input
          type="text"
          name="tacanOdg1"
          id="tacanOdg1"
          placeholder="Unesite odgovor"
          onChange={(e) => setOdgovor1(e.target.value)}
        />

        <h2>{datiKviz?.pitanje2}</h2>
        <label htmlFor="drugiodgovor">Odgovor 2</label>
        <input
          type="text"
          name="tacanOdg2"
          id="tacanOdg2"
          placeholder="Unesite odgovor"
          onChange={(e) => setOdgovor2(e.target.value)}
        />

        <h2>{datiKviz?.pitanje3}</h2>

        <label htmlFor="treciodgovor">Odgovor 3</label>
        <input
          type="text"
          name="tacanOdg3"
          id="tacanOdg3"
          placeholder="Unesite odgovor"
          onChange={(e) => setOdgovor3(e.target.value)}
        />

        <h2>{datiKviz?.pitanje4}</h2>

        <label htmlFor="cetvrtiodgovor">Odgovor 4</label>
        <input
          type="text"
          name="tacanOdg4"
          id="tacanOdg4"
          placeholder="Unesite odgovor"
          onChange={(e) => setOdgovor4(e.target.value)}
        />

        <h2>{datiKviz?.pitanje5}</h2>

        <label htmlFor="petiodgovor">Odgovor 5</label>
        <input
          type="text"
          name="tacanOdg5"
          id="tacanOdg5"
          placeholder="Unesite odgovor"
          onChange={(e) => setOdgovor5(e.target.value)}
        />

        <h2>{datiKviz?.pitanje6}</h2>

        <label htmlFor="sestiodgovor">Odgovor 6</label>
        <input
          type="text"
          name="tacanOdg6"
          id="tacanOdg6"
          placeholder="Unesite odgovor"
          onChange={(e) => setOdgovor6(e.target.value)}
        />

        <h2>{datiKviz?.pitanje7}</h2>

        <label htmlFor="sedmiodgovor">Odgovor 7</label>
        <input
          type="text"
          name="tacanOdg7"
          id="tacanOdg7"
          placeholder="Unesite odgovor"
          onChange={(e) => setOdgovor7(e.target.value)}
        />

        <h2>{datiKviz?.pitanje8}</h2>

        <label htmlFor="osmiodgovor">Odgovor 8</label>
        <input
          type="text"
          name="tacanOdg8"
          id="tacanOdg8"
          placeholder="Unesite odgovor"
          onChange={(e) => setOdgovor8(e.target.value)}
        />

        <h2>{datiKviz?.pitanje9}</h2>

        <label htmlFor="devetiodgovor">Odgovor 9</label>
        <input
          type="text"
          name="tacanOdg9"
          id="tacanOdg9"
          placeholder="Unesite odgovor"
          onChange={(e) => setOdgovor9(e.target.value)}
        />

        <h2>{datiKviz?.pitanje10}</h2>

        <label htmlFor="desetiodgovor">Odgovor 10</label>
        <input
          type="text"
          name="tacanOdg10"
          id="tacanOdg10"
          placeholder="Unesite odgovor"
          onChange={(e) => setOdgovor10(e.target.value)}
        />
        <div className="buttonOptions">
          <button onClick={() => proveriResenje()}>Proveri resenja</button>
        </div>

        {isProveren && <h2>Tacnih odgovora: {ocena}</h2>}
      </div>
    </>
  );
};

export default QuizPage;
