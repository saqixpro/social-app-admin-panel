import React from "react";
import { Icon } from "semantic-ui-react";

const styles = {
  input: {
    border: 0,
    padding: "10px",
  },
  container: {
    border: "1px solid #aaa",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginTop: "5px",
    marginBottom: "5px",
  },
};

const Input = ({ icon, label, type }) => {
  return (
    <div style={styles.mainContainer}>
      <label htmlFor="input" style={{ color: "#888" }}>
        {label}
      </label>
      <div style={styles.container}>
        <Icon name={icon} size={20} color="grey" />
        <input
          style={styles.input}
          type={type ? type : "text"}
          placeholder="username"
        />
      </div>
    </div>
  );
};

export default Input;
