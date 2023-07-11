import React from "react";
import "../styles/schooltab.scss";

interface Props {
  ime: string;
  adresa: string;
  brojtelefona: string;
  id: number;
}
const SchoolTab = (props: Props) => {
  return (
    <div className="schoolTab">
      <p>
        ID: {props.id}, Ime: {props.ime}, Adresa: {props.adresa}, Broj telefona:{" "}
        {props.brojtelefona}
      </p>
    </div>
  );
};

export default SchoolTab;
