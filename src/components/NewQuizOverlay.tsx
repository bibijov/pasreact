import React, { useEffect, useState } from "react";
import "../styles/newSTOverlay.scss";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { skoleRef } from "../utils/firebase";
interface Props {
  setIsNewQuiz?: any;
}
interface Kviz {
  imeKviza: string;
  pitanja: Array<PitanjeKviz>;
}
interface PitanjeKviz {
  pitanje: string;
  a: string;
  b: string;
  c: string;
  d: string;
  odgovor: string;
}
export function NewQuizOverlay(props: Props) {
  const { setIsNewQuiz } = props;
  const [imeKviza, setImeKviza] = useState<string>("");
  const [imePitanja, setImePitanja] = useState<string>("");
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [c, setC] = useState<string>("");
  const [d, setD] = useState<string>("");
  const [tacanOdgovor, setTacanOdgovor] = useState<string>("A");
  const [pitanje, setPitanje] = useState<PitanjeKviz>({
    a: "",
    b: "",
    c: "",
    d: "",
    odgovor: "",
    pitanje: "",
  });
  const [kviz, setKviz] = useState<Kviz | null>(null);
  const [i, setI] = useState<number>(0);
  const [klikPrethodno, setKlikPrethodno] = useState<boolean>(false);

  const sledece = () => {
    if (klikPrethodno === false) {
      if (
        a === "" ||
        b === "" ||
        c === "" ||
        d === "" ||
        tacanOdgovor === "" ||
        imePitanja === ""
      ) {
        alert("Nisu popunjena sva polja");
        return;
      }
      const trenutnoPitanje: PitanjeKviz = {
        a: a,
        b: b,
        c: c,
        d: d,
        odgovor: tacanOdgovor,
        pitanje: imePitanja,
      };
      if (i === 0) {
        const trenutniKviz: Kviz = {
          imeKviza: imeKviza,
          pitanja: [trenutnoPitanje],
        };
        setKviz(trenutniKviz);
      } else if (i !== 0 && kviz !== null) {
        const nizPitanja = kviz.pitanja;
        nizPitanja.push(trenutnoPitanje);
        const trenutniKviz: Kviz = {
          imeKviza: imeKviza,
          pitanja: nizPitanja,
        };
        setKviz(trenutniKviz);
      }
      console.log(kviz);
      setA("");
      setB("");
      setC("");
      setD("");
      setImePitanja("");
      setTacanOdgovor("A");
      setI(i + 1);
    } else if (klikPrethodno === true && kviz !== null) {
      console.log(i, kviz, "I");
      if (i < kviz.pitanja.length - 1) {
        setA(kviz.pitanja[i + 1].a);
        setB(kviz.pitanja[i + 1].b);
        setC(kviz.pitanja[i + 1].c);
        setD(kviz.pitanja[i + 1].d);
        setImePitanja(kviz.pitanja[i + 1].pitanje);
        setTacanOdgovor(kviz.pitanja[i + 1].odgovor);
        setI(i + 1);
      } else if (i === kviz.pitanja.length - 1) {
        setA("");
        setB("");
        setC("");
        setD("");
        setImePitanja("");
        setTacanOdgovor("");
        setI(i + 1);
        setKlikPrethodno(false);
      }
    }
  };
  const prethodno = () => {
    setKlikPrethodno(true);
    if (kviz !== null) {
      setA(kviz.pitanja[i - 1].a);
      setB(kviz.pitanja[i - 1].b);
      setC(kviz.pitanja[i - 1].c);
      setD(kviz.pitanja[i - 1].d);
      setImePitanja(kviz.pitanja[i - 1].pitanje);
      setTacanOdgovor(kviz.pitanja[i - 1].odgovor);
    }
    setI(i - 1);
  };

  useEffect(() => {
    console.log(kviz);
    // console.log(kviz?.pitanja.length);
  }, [kviz]);
  useEffect(() => {
    console.log("PROMENEJNO I", i);
  }, [i]);
  return (
    <div className="newSTOverlay">
      <div className="newSTBox">
        <h2>Novi kviz</h2>
        <input
          type="text"
          name="imeKviza"
          id="imeKviza"
          placeholder="Ime novog kviza"
          onChange={(e) => setImeKviza(e.target.value)}
          value={imeKviza}
          required
        />
        <input
          type="text"
          name="pitanje"
          id="pitanje"
          placeholder={`Pitanje ${i + 1}`}
          value={imePitanja}
          onChange={(e) => setImePitanja(e.target.value)}
          required
        />
        <input
          type="text"
          name="odgovorA"
          id="odgovorA"
          placeholder="Odgovor A"
          value={a}
          onChange={(e) => setA(e.target.value)}
          required
        />
        <input
          type="text"
          name="odgovorB"
          id="odgovorB"
          placeholder="Odgovor B"
          value={b}
          onChange={(e) => setB(e.target.value)}
          required
        />
        <input
          type="text"
          name="odgovorC"
          id="odgovorC"
          placeholder="Odgovor C"
          value={c}
          onChange={(e) => setC(e.target.value)}
          required
        />
        <input
          type="text"
          name="odgovorD"
          id="odgovorD"
          placeholder="Odgovor D"
          value={d}
          onChange={(e) => setD(e.target.value)}
          required
        />
        <label htmlFor="tacanOdgovor">Tačan odgovor</label>
        <select
          name="tacanOdgovor"
          id="tacanOdgovor"
          value={tacanOdgovor}
          onChange={(e) => setTacanOdgovor(e.target.value)}
          required
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <div className="buttonOptions">
          {i !== 0 && <button onClick={() => prethodno()}>Prethodno</button>}
          {(i + 1 !== kviz?.pitanja.length ||
            i === 0 ||
            klikPrethodno === true) && (
            <button onClick={() => sledece()}>Sledeće</button>
          )}
        </div>
        <div className="buttonOptions">
          <button onClick={() => {}}>Sačuvaj</button>
          <button onClick={() => setIsNewQuiz(false)}>Odustani</button>
        </div>
      </div>
    </div>
  );
}
