import React, { useEffect, useState } from "react";
import axios from "axios";

type random = {
  id: number;
  name: string;
  email: string;
};
const RandomList = () => {
  const [randomLjudi, setRandomLjudi] = useState<Array<random>>();

  async function dohvatiRandom() {
    try {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          setRandomLjudi(response.data);
          console.log(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    dohvatiRandom();
  }, []);
  return (
    <div className="randomList">
      <h1>Spisak random ljudi</h1>
      {randomLjudi?.map((random) => {
        return (
          <p style={{ color: "white" }}>
            {random.name}, {random.email}
          </p>
        );
      })}
    </div>
  );
};

export default RandomList;
