import React from "react";
import Rock from "../assets/rock.svg";
import Paper from "../assets/paper.svg";
import Scissors from "../assets/scissors.svg";

const PlaceholderControls = () => {
  return (
    <div className="control-placeholder">
      <img src={Rock} alt="Controls" />
      <img src={Paper} alt="Controls" />
      <img src={Scissors} alt="Controls" />
    </div>
  );
};

export default PlaceholderControls;
