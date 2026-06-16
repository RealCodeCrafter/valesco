import React from "react";
import "./leazy.scss";
import img from "../../assets/videos/lazy.gif";

const Leazy = () => {
  return (
    <div className="leazy">
      <div className="leazy__card">
        <img src={img} alt="leazy__card-img" />
      </div>
    </div>
  );
};

export default Leazy;