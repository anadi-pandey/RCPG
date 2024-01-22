export const incrementWins = (username) => {
  const users = JSON.parse(localStorage.getItem("RPS_Users") || "[]");
  console.log("Incremental");
  const tempArray = users.map((user) => {
    if (user.username === username) {
      return { ...user, wins: Number(user.wins) + 1 };
    } else {
      return user;
    }
  });
  localStorage.setItem("RPS_Users", JSON.stringify(tempArray));
};

export const getUsersPin = () => {
  const users = JSON.parse(localStorage.getItem("RPS_Users") || "[]");
  const tempArray = users.map((user) => {
    return { username: user.username, pin: user.pin, avatar: user.avatar };
  });
  return tempArray;
};

export const getPlayer = (value) => {
  console.log(value);
  let returnValue = {};
  const users = JSON.parse(localStorage.getItem("RPS_Users") || "[]");
  users.map((user) => {
    console.log(value, user.username);
    if (user.username === value) {
      returnValue = {
        username: user.username,
        pin: user.pin,
        avatar: user.avatar,
      };
    }
  });
  return returnValue;
};

export const CheckWaiting = (requested) => {
  console.log(requested);
  let INGAME = false;
  const ROOM = localStorage.getItem(requested?.username);
  if (ROOM) {
    const roomArray = JSON.parse(ROOM);
    if (roomArray) {
      console.log("In Game");
      INGAME = true;
    }
  }
  return INGAME;
};
