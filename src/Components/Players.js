import React, { useEffect, useState } from "react";
import Avatar from "../constants/Avatar";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Players = ({
  players,
  who,
  name,
  playerRequested,
  exclude,
  waitingList,
}) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);

  const handlePin = (value, pin, name) => {
    console.log(value, pin, name);
    if (value === pin) {
      const route = "/game-room";
      const params = { name: name, param2: "value2" };
      const paramString = new URLSearchParams(params).toString();
      const url = `${route}?${paramString}`;
      // Open a new tab with the specified URL
      const newTab = window.open(url, "_blank");
      // If you want, you can focus on the new tab
      newTab.focus();
    }
  };

  const handleLogin = (x) => {
    setLogin(x);
  };

  useEffect(() => {
    console.log(waitingList);
  }, [waitingList]);

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      {!who && <h3 className="players-lobby">Players Available</h3>}{" "}
      {who && <h1 className="players-lobby">Please Select Player One</h1>}
      {players.map((x) =>
        x?.username === exclude ? null : (
          <div
            className={!who ? "player-line-item" : "who-line-item"}
            onClick={() => handleLogin(x.username)}
          >
            <Avatar avatar={x.avatar} />
            <div>{x.username}</div>
            {!who && (
              <Button
                className="play-button"
                onClick={() => playerRequested(x)}
              >
                Play
              </Button>
            )}{" "}
            {login === x.username && who && (
              <Input
                placeholder="PIN"
                style={{ width: "100px", position: "absolute", right: "10px" }}
                onChange={(e) => handlePin(e.target.value, x.pin, x.username)}
                type="password"
              />
            )}
          </div>
        )
      )}
      {waitingList && waitingList?.length !== 0 && (
        <div
          className="player-choice"
          style={{ color: "white", height: "500px" }}
        >
          <h3>Waiting List</h3>
          {waitingList.map((x) => {
            console.log(x);
            return (
              <div style={{ margin: "10px" }}>{x.username} is in a game.</div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Players;
