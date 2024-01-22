import React from "react";
import Players from "../Components/Players";
import { getUsersPin } from "./updationLogic";
import { Input } from "antd";

const WhoIsPlaying = () => {
  const players = getUsersPin();
  return (
    <div style={{ height: "100vh" }}>
      <Players players={players} who />
    </div>
  );
};

export default WhoIsPlaying;
