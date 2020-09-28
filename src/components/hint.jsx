import React from "react";
import { Icon } from "semantic-ui-react";

const style = {
  content: {
    color: "#bbb",
    fontSize: 20,
    fontWeight: "100",
    marginLeft: "1%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
};

const Hint = ({ icon, text }) => {
  return (
    <div style={style.container}>
      <Icon name={icon} size="big" color="grey" />
      <p style={style.content}>{text}</p>
    </div>
  );
};

export default Hint;
