import React, { useEffect, useState } from "react";
import QuizTab from "../components/QuizTab";
import axios from "axios";
interface Props {}
export type Quiz = {
  id: number;
  ime: string;
  opis: string;
  pitanje1: string;
  odgovor1: string;
  pitanje2: string;
  odgovor2: string;
  pitanje3: string;
  odgovor3: string;
  pitanje4: string;
  odgovor4: string;
  pitanje5: string;
  odgovor5: string;
  pitanje6: string;
  odgovor6: string;
  pitanje7: string;
  odgovor7: string;
  pitanje8: string;
  odgovor8: string;
  pitanje9: string;
  odgovor9: string;
  pitanje10: string;
  odgovor10: string;
};
const QuizList = (props: Props) => {
  const [nizKvizova, setNizKvizova] = useState<Array<Quiz>>([]);

  async function dohvatanje() {
    try {
      await axios.get("http://localhost:8000/api/v1/kvizs").then((response) => {
        console.log(response.data.data);
        setNizKvizova(response.data.data);
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    dohvatanje();
  }, []);
  return (
    <div
      className="quizList"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h1>Spisak kvizova</h1>
      <div
        className="kList"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        {nizKvizova.map((kviz) => {
          return <QuizTab id={kviz.id} ime={kviz.ime} opis={kviz.opis} />;
        })}
      </div>
    </div>
  );
};

export default QuizList;
