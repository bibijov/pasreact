import React from "react";
import "../styles/navigation.scss";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
interface Props {}

export function Navigation(props: Props) {
  const navigate = useNavigate();
  return (
    <div className="navigation">
      <div className="iconBox" onClick={() => navigate("/")}>
        <CgProfile color="#2563eb" size={50} />
      </div>
      <div className="iconBox" onClick={() => navigate("/home")}>
        <AiOutlineHome color="#2563eb" size={50} />
      </div>
    </div>
  );
}
