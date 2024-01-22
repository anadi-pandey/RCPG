import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Avatar from "../constants/Avatar";
import { CaretDownOutlined } from "@ant-design/icons";
import PlaceholderControls from "../Components/PlaceholderControls";
import Lottie from "lottie-react-web";
import Three from "../assets/One.json";
import Responded from "../assets/RESPONDED.svg";
import play from "../assets/play-svgrepo-com.svg";
import GameResponse from "../Components/GameResponse";
import { Input, notification } from "antd";
import { getPlayer, incrementWins } from "./updationLogic";
import { useLocation } from "react-router-dom";
import UpdatorContext from "../UpdaterContext";

const Context = React.createContext({
  name: "Default",
});

const GameConsole = ({ playerRequested, scoreUpdate }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("name");

  const [api, contextHolder] = notification.useNotification();
  const [playerResponse, setPlayerResponse] = useState({
    one: { isResponsed: false, response: "", currentResults: "", wins: 0 },
    two: { isResponsed: false, response: "", currentResults: "", wins: 0 },
  });
  const player1 = useRef();
  const player2 = useRef();
  const [game, setGame] = useState({
    active: false,
    one: 0,
    two: 0,
    result: "none",
  });
  const [userOne, setUserOne] = useState({});
  const [userTwo, setUserTwo] = useState({});

  const openNotification = (placement) => {
    console.log(game.result);
    if (game.result !== "none")
      return api.info({
        message: `Notification`,
        description: (
          <Context.Consumer>
            {({ name }) => "Please press play button to play again"}
          </Context.Consumer>
        ),
        placement,
      });
  };

  const resetGame = () => {
    setPlayerResponse({
      one: {
        isResponsed: false,
        response: "",
        currentResults: "",
        wins: playerResponse?.one?.wins,
      },
      two: {
        isResponsed: false,
        response: "",
        currentResults: "",
        wins: playerResponse?.two?.wins,
      },
    });
    setGame({
      active: false,
      one: game.one,
      two: game.two,
      result: "none",
    });
    localStorage.setItem(userOne.username, null);
    localStorage.setItem(userTwo.username, null);
    localStorage.setItem("BLOCK", JSON.stringify(false));
  };

  const handlePin = (value) => {
    if (playerRequested.pin === value) {
      setUserTwo(playerRequested);
    }
  };

  //   Handling Pause Play Functionality
  useEffect(() => {
    if (
      localStorage.getItem(userOne.username) !== null &&
      localStorage.getItem(userTwo.username) !== null
    ) {
      console.log(playerResponse);
      const responseOne = playerResponse.one.response;
      const responseTwo = playerResponse.two.response;
      if (playerResponse.one.isResponsed && playerResponse.two.isResponsed) {
        if (responseOne === responseTwo) {
          console.log("It's a tie!");
          setGame({
            active: false,
            one: game.one,
            two: game.two,
            result: "tie",
          });
        } else if (
          (responseOne === 1 && responseTwo === 3) ||
          (responseOne === 2 && responseTwo === 1) ||
          (responseOne === 3 && responseTwo === 2)
        ) {
          console.log("One Wins");
          setGame({
            active: false,
            one: game.one + 1,
            two: game.two,
            result: "one",
          });
        } else {
          console.log("Two Wins");
          setGame({
            active: false,
            one: game.one,
            two: game.two + 1,
            result: "two",
          });
        }
      }
    }
  }, [playerResponse]);

  useEffect(() => {
    setUserOne(getPlayer(name));
  }, [location]);

  useEffect(() => {
    if (playerRequested?.username === undefined) setUserTwo({});
  }, [playerRequested]);

  const { myState, updateState } = useContext(UpdatorContext);

  useEffect(() => {
    // This will run whenever myState changes
    console.log("Context state changed:", myState);
  }, [myState]);

  //   Handling Responses
  const handleKeyPress = (event) => {
    console.log(localStorage.getItem("BLOCK"), "BLOCK");
    if (!JSON.parse(localStorage.getItem("BLOCK"))) {
      console.log(event.key, playerResponse);
      const playerOneResponse = JSON.parse(
        localStorage.getItem(userOne?.username) === null
          ? "{}"
          : localStorage.getItem(userOne?.username)
      );
      const playerTwoResponse = JSON.parse(
        localStorage.getItem(userTwo?.username) === null
          ? "{}"
          : localStorage.getItem(userTwo?.username)
      );

      console.log(playerOneResponse, playerTwoResponse);
      // Check if the pressed key is one of the specified keys
      switch (event.key) {
        case "a":
          // console.log('Key "a" pressed');
          playerTwoResponse === null
            ? setPlayerResponse({
                ...playerResponse,
                two: { isResponsed: false, response: "" },
                one: { isResponsed: true, response: 1 },
              })
            : setPlayerResponse({
                one: { isResponsed: true, response: 1 },
                two: playerTwoResponse,
              });

          userOne.username &&
            localStorage.setItem(
              userOne.username,
              JSON.stringify({ isResponsed: true, response: 1 })
            );
          break;

        case "s":
          playerTwoResponse === null
            ? setPlayerResponse({
                ...playerResponse,
                two: { isResponsed: false, response: "" },
                one: { isResponsed: true, response: 2 },
              })
            : setPlayerResponse({
                one: { isResponsed: true, response: 2 },
                two: playerTwoResponse,
              });
          userOne.username &&
            localStorage.setItem(
              userOne.username,
              JSON.stringify({ isResponsed: true, response: 2 })
            );
          break;

        case "d":
          playerTwoResponse === null
            ? setPlayerResponse({
                ...playerResponse,
                two: { isResponsed: false, response: "" },
                one: { isResponsed: true, response: 3 },
              })
            : setPlayerResponse({
                one: { isResponsed: true, response: 3 },
                two: playerTwoResponse,
              });

          userOne.username &&
            localStorage.setItem(
              userOne.username,
              JSON.stringify({ isResponsed: true, response: 3 })
            );
          break;
        case "j":
          playerOneResponse === null
            ? setPlayerResponse({
                ...playerResponse,
                one: { isResponsed: false, response: "" },
                two: { isResponsed: true, response: 1 },
              })
            : setPlayerResponse({
                two: { isResponsed: true, response: 1 },
                one: playerOneResponse,
              });

          userTwo.username &&
            localStorage.setItem(
              userTwo.username,
              JSON.stringify({ isResponsed: true, response: 1 })
            );
          break;
        case "k":
          playerOneResponse === null
            ? setPlayerResponse({
                ...playerResponse,
                one: { isResponsed: false, response: "" },
                two: { isResponsed: true, response: 2 },
              })
            : setPlayerResponse({
                two: { isResponsed: true, response: 2 },
                one: playerOneResponse,
              });

          userTwo?.username &&
            localStorage.setItem(
              userTwo.username,
              JSON.stringify({ isResponsed: true, response: 2 })
            );

          break;
        case "l":
          // console.log('Key "l" pressed');
          // Your code for 'l' key press goes here
          playerOneResponse === null
            ? setPlayerResponse({
                ...playerResponse,
                one: { isResponsed: false, response: "" },
                two: { isResponsed: true, response: 3 },
              })
            : setPlayerResponse({
                two: { isResponsed: true, response: 3 },
                one: playerOneResponse,
              });
          userTwo.username &&
            localStorage.setItem(
              userTwo.username,
              JSON.stringify({ isResponsed: true, response: 3 })
            );
          break;
        default:
          // Handle other keys if needed
          break;
      }
    }
  };

  useEffect(() => {
    if (game?.result === "one") {
      incrementWins(userOne?.username);
      scoreUpdate();
      localStorage.setItem("BLOCK", JSON.stringify(true));
      openNotification("topRight");
    }
    if (game?.result === "two") {
      incrementWins(userTwo.username);
      localStorage.setItem("BLOCK", JSON.stringify(true));
      scoreUpdate();
      openNotification("topRight");
    }
    if (game?.result !== "none" && game?.result === "tie") {
      localStorage.setItem("BLOCK", JSON.stringify(true));
      openNotification("topRight");
    }
  }, [game]);

  document.addEventListener("keydown", handleKeyPress);

  useEffect(() => {
    localStorage.setItem("BLOCK", JSON.stringify(false));
  }, []);

  return (
    <div>
      {contextHolder}
      <h3 className="players-lobby">Game Console</h3>
      {/* Players */}
      <div className="game-console">
        <div className="player player-one">
          <div className="player-choice">
            {!playerResponse.one.isResponsed ? (
              <Lottie
                ref={player1}
                height={320}
                options={{
                  animationData: Three,
                  rendererSettings: {
                    frameRate: 120, // Set a higher frame rate (default is 30)
                  },
                  speed: 0.5,
                }}
              />
            ) : (
              <div className="responded">
                {game.result === "none" && playerResponse.one.isResponsed && (
                  <div className="intial-response">
                    <img src={Responded} className="response-image" />
                    Responded
                  </div>
                )}
                {game.result !== "none" && (
                  <GameResponse
                    response={playerResponse.one.response}
                    win={game.result === "one"}
                  />
                )}
              </div>
            )}
            <div className="game-controls-console">
              <div style={{ display: "flex" }}>
                <div className="game-key">
                  <p>A</p>
                </div>
                <div className="game-key">
                  <p>S</p>
                </div>
                <div className="game-key">
                  <p>D</p>
                </div>
              </div>
              <PlaceholderControls />
            </div>
          </div>
          <div className="player-avatar">
            <Avatar avatar={userOne?.avatar || "One"} gameConsole={true} />
            <div className="player-name">{userOne?.username}</div>
            <CaretDownOutlined style={{ color: "#ff9843 " }} />
          </div>
        </div>
        <div className="player player-two">
          <div className="player-choice">
            {!playerResponse.two.isResponsed ? (
              userTwo?.username !== undefined ? (
                <Lottie
                  ref={player2}
                  height={320}
                  options={{
                    animationData: Three,
                    rendererSettings: {
                      frameRate: 120, // Set a higher frame rate (default is 30)
                    },
                    speed: 0.5,
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "320px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  {playerRequested?.username}{" "}
                  {playerRequested?.username === undefined
                    ? "Select from Availabe players"
                    : "Please Enter Pin"}
                </div>
              )
            ) : (
              <div className="responded">
                {game.result === "none" && playerResponse.two.isResponsed && (
                  <div className="intial-response">
                    <img src={Responded} className="response-image" />
                    Responded
                  </div>
                )}
                {game.result !== "none" && (
                  <GameResponse
                    response={playerResponse.two.response}
                    win={game.result === "two"}
                  />
                )}
              </div>
            )}
            <div className="game-controls-console">
              <div style={{ display: "flex" }}>
                {" "}
                <div className="game-key">
                  <p>J</p>
                </div>
                <div className="game-key">
                  <p>K</p>
                </div>
                <div className="game-key">
                  <p>L</p>
                </div>
              </div>

              {userTwo?.username === undefined ? (
                <Input
                  style={{ height: "45px", marginTop: "10px" }}
                  placeholder="Enter Pin"
                  type="password"
                  maxLength={4}
                  onChange={(e) => handlePin(e.target.value)}
                />
              ) : (
                <PlaceholderControls />
              )}
            </div>
          </div>

          <div className="player-avatar">
            <Avatar avatar="Two" gameConsole={true} />
            <div className="player-name">{userTwo?.username || "Waiting"}</div>
            <CaretDownOutlined style={{ color: "#ff9843 " }} />
          </div>
        </div>
      </div>
      {/* Score */}
      <div className="score">
        <div className="players">{game.one}</div>
        <div>
          <img
            src={play}
            alt="Restart"
            className="controller"
            onClick={() => resetGame()}
          />
        </div>
        <div className="players">{game.two}</div>
      </div>
    </div>
  );
};

export default GameConsole;
