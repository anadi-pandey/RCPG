// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./modules/LandingPage";
import GameRoom from "./modules/GameRoom";
import WhoIsPlaying from "./modules/WhoIsPlaying";
import "./App.css";
import { Button } from "antd";
import createUpdateWorker from "./updateWorker.js";

const App = () => {
  const [result, setResult] = useState(null);
  const worker = createUpdateWorker();
  const broadcastChannel = new BroadcastChannel("sharedChannel");
  const [updater, setUpdater] = useState(false);

  useEffect(() => {
    const handleBroadcastMessage = (event) => {
      if (event.data.type === "update") {
        setResult(event.data.data);
      }
    };

    // Create a new BroadcastChannel instance with the same channel name

    // Listen for the broadcasted messages
    broadcastChannel.addEventListener("message", handleBroadcastMessage);

    return () => {
      // Clean up the event listener when the component is unmounted
      broadcastChannel.removeEventListener("message", handleBroadcastMessage);
    };
  }, [worker]);

  const runWorker = () => {
    if (worker) {
      const dataToSend = Math.random();
      worker.postMessage(dataToSend);
    }
  };

  useEffect(() => {
    console.log(result, "From Worker Update");
  }, [broadcastChannel]);

  return (
    <div className="game-container">
      {/* <Button onClick={() => runWorker()}>Send Data</Button> */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/game-room"
            element={
              <GameRoom updateWorker={() => runWorker()} result={result} />
            }
          />
          <Route path="/who-is-playing" element={<WhoIsPlaying />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
