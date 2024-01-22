import React, { useState } from "react";
import "../App.css";
import LandingPageBanner from "../assets/Landing.svg";
import { Alert, Button, Drawer, Input, Typography, notification } from "antd";
import AvatarCollection from "../Components/AvatarCollection";
import { Form, useNavigate } from "react-router-dom";
const { Title } = Typography;

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ username: "", pin: "", submit: false });
  const [avatar, setAvatar] = useState("");
  const users = localStorage.getItem("RPS_Users") || "[]";
  console.log(users);
  const navigate = useNavigate();

  const isUnique = () => {
    const usernames = JSON.parse(users).map((user) => user.username);
    console.log(usernames, "Uniques");
    return usernames.includes(user.username) ? false : true;
  };

  const handleSubmit = () => {
    if (
      avatar !== "" &&
      user.pin !== "" &&
      user.username !== "" &&
      isUnique()
    ) {
      console.log("User", { ...user, avatar: avatar, submit: true });
      const newUsers = [
        ...JSON.parse(users),
        { username: user.username, pin: user.pin, avatar: avatar, wins: 0 },
      ];
      localStorage.setItem("RPS_Users", JSON.stringify(newUsers));
      handleClose();
      setOpen(false);
      openNotificationWithIcon("success");
    } else {
      setUser({ ...user, submit: true });
      isUnique()
        ? openNotificationWithIcon("info")
        : openNotificationWithIcon("error");
    }
  };

  const handleClose = () => {
    console.log("Clear");
    setUser({ username: "", pin: "" });
    setAvatar("");
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    if (type !== "success")
      api[type]({
        message:
          type === "error"
            ? "Username already in use"
            : "Please fill required fields.",
        description:
          type === "error" ? "" : "Fill in username, pin and select avatar.",
      });
    else
      api[type]({
        message: "Player Successfully Added",
        description: "",
      });
  };

  return (
    <div>
      {contextHolder}
      <div className="image-container">
        <img src={LandingPageBanner} className="landing-banner" />
        <Title
          level={3}
          style={{
            textShadow: "1px",
            fontWeight: "600",
            color: "#FF9843",
          }}
        >
          Rock, paper, scissors.
        </Title>
        <Title
          level={5}
          style={{
            textShadow: "1px",
            fontWeight: "600",
            color: "#FFDD95",
            margin: "0",
          }}
        >
          OG decision-making algorithm 🎯.
        </Title>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "60%",
          margin: " 20px auto",
        }}
      >
        <Button className="game-controls" onClick={() => setOpen(true)}>
          Register
        </Button>
        <Button
          className="game-controls"
          onClick={() => navigate("/who-is-playing")}
        >
          Play
        </Button>
      </div>
      <Drawer
        title="Create Players"
        placement="left"
        closable={false}
        open={open}
        maskClosable={true}
        destroyOnClose={true}
        onClose={() => handleClose()}
      >
        <form>
          <div className="drawer-container">
            <Input
              placeholder="Choose User name"
              className="form-input"
              name="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <Input
              placeholder="Pin"
              type="password"
              maxLength={4}
              className="form-input"
              name="password"
              onChange={(e) => setUser({ ...user, pin: e.target.value })}
            />
            {user.submit &&
              (user.username === "" || user.pin === "" || !isUnique()) && (
                <Alert
                  message={
                    isUnique()
                      ? "Fill the details and select avatar."
                      : "Username already in use."
                  }
                  type="error"
                  style={{ margin: "4px 0" }}
                />
              )}{" "}
            <h4>Select Your Avatar</h4>
            <AvatarCollection parentCallback={(option) => setAvatar(option)} />
            <div className="form-button-container">
              <Button
                className="form-button"
                onClick={() => {
                  handleClose();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="form-button"
                type="submit"
                onClick={() => handleSubmit()}
              >
                Create
              </Button>
            </div>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default LandingPage;
