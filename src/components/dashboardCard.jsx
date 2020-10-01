import React from "react";
import "../styles/main.css";

const DashBoardCard = ({ title, value }) => {
  return (
    <div className="dashboardCard">
      <p className="dbCard-title">{title}</p>
      <p className="dbCard-value">{value}</p>
    </div>
  );
};

export default DashBoardCard;
