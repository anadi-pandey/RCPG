import { Table } from "antd";
import React, { useContext } from "react";
import Lottie from "lottie-react-web";
import first from "../assets/first.svg";
import third from "../assets/second.svg";
import second from "../assets/third.svg";
import One from "../assets/Three.json";
import Avatar from "../constants/Avatar";

const Leaderboard = ({ players }) => {
  const trophy = { 1: first, 2: second, 3: third };
  const sorted = [...players.sort((a, b) => b.wins - a.wins)];
  const tableData = sorted.map((player, index) => {
    return {
      key: index,
      username: player.username,
      wins: player?.wins,
      rank: index + 1,
      avatar: player.avatar,
    };
  });

  const tablecoloumn = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <img src={trophy[text]} style={{ width: "15px" }} />
          <span> {text}</span>
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Wins",
      dataIndex: "wins",
      key: "wins",
    },
    {
      title: "Lucky",
      dataIndex: "luckPercent",
      key: "luckPercent",
    },
  ];

  return (
    <div className="leader-board">
      <h3 className="players-lobby">Leaderboard</h3>
      <div className="winner">
        <Avatar avatar={tableData[0]?.avatar} />
        <div className="winner-name">{tableData[0].username}</div>
        <Lottie
          height={120}
          options={{
            animationData: One,
          }}
        />
      </div>

      <Table columns={tablecoloumn} dataSource={tableData} pagination={false} />
    </div>
  );
};

export default Leaderboard;
