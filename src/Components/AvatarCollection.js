import React, { useState } from "react";
import One from "../assets/11.svg";
import Two from "../assets/12.svg";
import Three from "../assets/13.svg";
import Four from "../assets/14.svg";
import Five from "../assets/5.svg";
import Six from "../assets/15.svg";
import Seven from "../assets/7.svg";
import Eight from "../assets/8.svg";
import Nine from "../assets/9.svg";
import Ten from "../assets/10.svg";

const AvatarCollection = ({ parentCallback }) => {
  const AvatarArray = {
    One: One,
    Two: Two,
    Three: Three,
    Four: Four,
    Five: Five,
    Six: Six,
    Seven: Seven,
    Eight: Eight,
    Nine: Nine,
    Ten: Ten,
  };
  const [avatar, setAvatar] = useState("");

  const handleSelection = (option) => {
    setAvatar(option);
    parentCallback(option);
  };
  return (
    <div className="avatar-collection">
      {Object.keys(AvatarArray)?.map((x) => {
        return (
          <div
            className={
              x === avatar ? "selected-avatar-container" : "avatar-container"
            }
            onClick={() => handleSelection(x)}
          >
            <img src={AvatarArray[x]} alt="avatar" className="avatars" />
          </div>
        );
      })}
    </div>
  );
};

export default AvatarCollection;
