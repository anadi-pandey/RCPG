import React, { useContext, useEffect, useState } from "react";
import Avatar from "../constants/Avatar";
import Players from "../Components/Players";
import Leaderboard from "../Components/Leaderboard";
import GameConsole from "./GameConsole";
import UpdatorContext from "../UpdaterContext";
import { useLocation } from "react-router-dom";
import { CheckWaiting } from "./updationLogic";

const GameRoom = ({ updateWorker, result }) => {
  const users = localStorage.getItem("RPS_Users");
  const [playerRequested, setPlayerRequested] = useState({});
  const [players, setPlayers] = useState(users ? JSON.parse(users) : []);
  const [waitingList, setWaiting] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("name");

  const { myState, updateState } = useContext(UpdatorContext);

  useEffect(() => {
    // This will run whenever myState changes
    console.log("Context state changed:", myState);
    const users = localStorage.getItem("RPS_Users");
    setPlayers(users ? JSON.parse(users) : []);
  }, [myState]);

  useEffect(() => {
    console.log("RESSSULLLT");
    const users = localStorage.getItem("RPS_Users");
    setPlayers(users ? JSON.parse(users) : []);
  }, [result]);

  useEffect(() => {
    if (CheckWaiting(playerRequested)) {
      setWaiting([...waitingList, playerRequested]);
    }
  }, [playerRequested]);

  return (
    <div className="game-room-container">
      <Leaderboard players={players} />
      <GameConsole
        playerRequested={playerRequested}
        scoreUpdate={() => {
          updateState(Math.random);
          updateWorker();
        }}
      />
      <Players
        players={players}
        playerRequested={(data) => setPlayerRequested(data)}
        exclude={name}
        waitingList={waitingList}
      />
    </div>
  );
};

export default GameRoom;
