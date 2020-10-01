import React, { useState } from "react";
import DashBoardCard from "../components/dashboardCard";
import "../styles/main.css";

const Dashboard = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [bannedUsers, setBannedUsers] = useState(0);

  return (
    <div className="db-container">
      <div className="db-cards">
        <DashBoardCard title="Active Users" value={activeUsers} />
        <DashBoardCard title="Total Posts" value={totalPosts} />
        <DashBoardCard title="Banned Users" value={bannedUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
