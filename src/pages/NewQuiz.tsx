import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import "../styles/newquiz.scss";
import { AppContext } from "../functions/AppProvider";
import axios from "axios";

interface Props {}
const NewQuiz = (props: Props) => {
  const { currentUser } = useContext(AppContext);
  const [imeKviza, setImeKviza] = useState<string>("");
  const [opisKviza, setOpisKviza] = useState<string>("");
  const [pitanje1, setPitanje1] = useState<string>("");
  const [odgovor1, setOdgovor1] = useState<string>("");
  const [pitanje2, setPitanje2] = useState<string>("");
  const [odgovor2, setOdgovor2] = useState<string>("");
  const [pitanje3, setPitanje3] = useState<string>("");
  const [odgovor3, setOdgovor3] = useState<string>("");
  const [pitanje4, setPitanje4] = useState<string>("");
  const [odgovor4, setOdgovor4] = useState<string>("");
  const [pitanje5, setPitanje5] = useState<string>("");
  const [odgovor5, setOdgovor5] = useState<string>("");
  const [pitanje6, setPitanje6] = useState<string>("");
  const [odgovor6, setOdgovor6] = useState<string>("");
  const [pitanje7, setPitanje7] = useState<string>("");
  const [odgovor7, setOdgovor7] = useState<string>("");
  const [pitanje8, setPitanje8] = useState<string>("");
  const [odgovor8, setOdgovor8] = useState<string>("");
  const [pitanje9, setPitanje9] = useState<string>("");
  const [odgovor9, setOdgovor9] = useState<string>("");
  const [pitanje10, setPitanje10] = useState<string>("");
  const [odgovor10, setOdgovor10] = useState<string>("");
  const navigate = useNavigate();
  async function napraviKviz() {
    try {
      await axios
        .post("http://localhost:8000/api/v1/kvizs", {
          ime: imeKviza,
          opis: opisKviza,
          pitanje_1: pitanje1,
          odgovor_1: odgovor1,
          pitanje_2: pitanje2,
          odgovor_2: odgovor2,
          pitanje_3: pitanje3,
          odgovor_3: odgovor3,
          pitanje_4: pitanje4,
          odgovor_4: odgovor4,
          pitanje_5: pitanje5,
          odgovor_5: odgovor5,
          pitanje_6: pitanje6,
          odgovor_6: odgovor6,
          pitanje_7: pitanje7,
          odgovor_7: odgovor7,
          pitanje_8: pitanje8,
          odgovor_8: odgovor8,
          pitanje_9: pitanje9,
          odgovor_9: odgovor9,
          pitanje_10: pitanje10,
          odgovor_10: odgovor10,
          korisnik_id: currentUser?.id,
          autoskola_id: currentUser?.autoskola_id,
        })
        .then(() => {
          alert("Uspesno napravljen kviz!");
          navigate("/home");
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <h1>Novi kviz</h1>
      <div className="noviKviz">
        <label htmlFor="imeKviza">Ime kviza</label>
        <input
          type="text"
          name="imeKviza"
          id="imeKviza"
          placeholder="Ime Kviza"
          onChange={(e) => setImeKviza(e.target.value)}
        />
        <label htmlFor="opisKviza">Opis kviza</label>
        <input
          type="text"
          name="opisKviza"
          id="opisKviza"
          placeholder="Opis kviza"
          onChange={(e) => setOpisKviza(e.target.value)}
        />
        <label htmlFor="prvoPitanje">Pitanje 1</label>
        <input
          type="text"
          name="prvoPitanje"
          id="prvoPitanje"
          placeholder="Prvo pitanje"
          onChange={(e) => setPitanje1(e.target.value)}
        />
        <label htmlFor="prviodgovor">Tacan odgovor 1</label>
        <input
          type="text"
          name="tacanOdg1"
          id="tacanOdg1"
          placeholder="Tacan odgovor 1"
          onChange={(e) => setOdgovor1(e.target.value)}
        />

        <label htmlFor="drugoPitanje">Pitanje 2</label>
        <input
          type="text"
          name="drugoPitanje"
          id="drugoPitanje"
          placeholder="Drugo pitanje"
          onChange={(e) => setPitanje2(e.target.value)}
        />
        <label htmlFor="drugiodgovor">Tacan odgovor 2</label>
        <input
          type="text"
          name="tacanOdg2"
          id="tacanOdg2"
          placeholder="Tacan odgovor 2"
          onChange={(e) => setOdgovor2(e.target.value)}
        />

        <label htmlFor="trecePitanje">Pitanje 3</label>
        <input
          type="text"
          name="trecePitanje"
          id="trecePitanje"
          placeholder="Trece pitanje"
          onChange={(e) => setPitanje3(e.target.value)}
        />
        <label htmlFor="treciodgovor">Tacan odgovor 3</label>
        <input
          type="text"
          name="tacanOdg3"
          id="tacanOdg3"
          placeholder="Tacan odgovor 3"
          onChange={(e) => setOdgovor3(e.target.value)}
        />

        <label htmlFor="cetvrtoPitanje">Pitanje 4</label>
        <input
          type="text"
          name="cetvrtoPitanje"
          id="cetvrtoPitanje"
          placeholder="Cetvrto pitanje"
          onChange={(e) => setPitanje4(e.target.value)}
        />
        <label htmlFor="cetvrtiodgovor">Tacan odgovor 4</label>
        <input
          type="text"
          name="tacanOdg4"
          id="tacanOdg4"
          placeholder="Tacan odgovor 4"
          onChange={(e) => setOdgovor4(e.target.value)}
        />

        <label htmlFor="petoPitanje">Pitanje 5</label>
        <input
          type="text"
          name="petoPitanje"
          id="petoPitanje"
          placeholder="Peto pitanje"
          onChange={(e) => setPitanje5(e.target.value)}
        />
        <label htmlFor="petiodgovor">Tacan odgovor 5</label>
        <input
          type="text"
          name="tacanOdg5"
          id="tacanOdg5"
          placeholder="Tacan odgovor 5"
          onChange={(e) => setOdgovor5(e.target.value)}
        />

        <label htmlFor="sestoPitanje">Pitanje 6</label>
        <input
          type="text"
          name="sestoPitanje"
          id="sestoPitanje"
          placeholder="Sesto pitanje"
          onChange={(e) => setPitanje6(e.target.value)}
        />
        <label htmlFor="sestiodgovor">Tacan odgovor 6</label>
        <input
          type="text"
          name="tacanOdg6"
          id="tacanOdg6"
          placeholder="Tacan odgovor 6"
          onChange={(e) => setOdgovor6(e.target.value)}
        />

        <label htmlFor="sedmoPitanje">Pitanje 7</label>
        <input
          type="text"
          name="sedmoPitanje"
          id="sedmoPitanje"
          placeholder="Sedmo pitanje"
          onChange={(e) => setPitanje7(e.target.value)}
        />
        <label htmlFor="sedmiodgovor">Tacan odgovor 7</label>
        <input
          type="text"
          name="tacanOdg7"
          id="tacanOdg7"
          placeholder="Tacan odgovor 7"
          onChange={(e) => setOdgovor7(e.target.value)}
        />

        <label htmlFor="osmoPitanje">Pitanje 8</label>
        <input
          type="text"
          name="osmoPitanje"
          id="osmoPitanje"
          placeholder="Osmo pitanje"
          onChange={(e) => setPitanje8(e.target.value)}
        />
        <label htmlFor="osmiodgovor">Tacan odgovor 8</label>
        <input
          type="text"
          name="tacanOdg8"
          id="tacanOdg8"
          placeholder="Tacan odgovor 8"
          onChange={(e) => setOdgovor8(e.target.value)}
        />

        <label htmlFor="devetoPitanje">Pitanje 9</label>
        <input
          type="text"
          name="devetoPitanje"
          id="devetoPitanje"
          placeholder="Deveto pitanje"
          onChange={(e) => setPitanje9(e.target.value)}
        />
        <label htmlFor="devetiodgovor">Tacan odgovor 9</label>
        <input
          type="text"
          name="tacanOdg9"
          id="tacanOdg9"
          placeholder="Tacan odgovor 9"
          onChange={(e) => setOdgovor9(e.target.value)}
        />

        <label htmlFor="desetoPitanje">Pitanje 10</label>
        <input
          type="text"
          name="desetoPitanje"
          id="desetoPitanje"
          placeholder="Deseto pitanje"
          onChange={(e) => setPitanje10(e.target.value)}
        />
        <label htmlFor="desetiodgovor">Tacan odgovor 10</label>
        <input
          type="text"
          name="tacanOdg10"
          id="tacanOdg10"
          placeholder="Tacan odgovor 10"
          onChange={(e) => setOdgovor10(e.target.value)}
        />
        <div className="buttonOptions">
          <button onClick={() => napraviKviz()}>Napravi kviz</button>
        </div>
      </div>
    </>
  );
};

export default NewQuiz;
