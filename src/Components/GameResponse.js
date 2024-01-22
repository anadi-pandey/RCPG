import React from "react";
import scissors from "../assets/scissors.svg";
import paper from "../assets/paper.svg";
import rock from "../assets/rock.svg";
import One from "../assets/Win.json";
import Lottie from "lottie-react-web";

const GameResponse = ({ response, win }) => {
  const collection = { scissors: scissors, paper: paper, rock: rock };
  const getResponse = () => {
    switch (response) {
      case 3:
        return scissors;
      case 2:
        return collection.paper;
      case 1:
        return collection.rock;
      default:
        return "// code block";
    }
  };
  return (
    <div className="response-image-container">
      <img src={getResponse()} className="response-image" />
      {win && (
        <Lottie
          options={{
            animationData: One,
          }}
          style={{ position: "absolute" }}
        />
      )}
    </div>
  );
};

export default GameResponse;
