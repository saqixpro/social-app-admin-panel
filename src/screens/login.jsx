import React, { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { Hint } from "../components";
import { Button, Input, Icon } from "semantic-ui-react";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [_emailValid, setEmailValidation] = useState(true);
  const [_passwordValid, setPasswordValidation] = useState(true);

  const onPressSignIn = async () => {
    alert(`You will be signed in`);
  };

  const validateEmail = () => {
    const validationExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validationExp.test(email);
  };

  const validatePassword = () => {
    const validationExp = /^[A-Za-z]\w{7,14}$/;
    return validationExp.test(password);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="content">
          <Hint icon="search" text="Follow Your Interests" />
          <Hint icon="users" text="Hear What Other People are Talking About" />
          <Hint icon="chat" text="Join a conversation" />

          <div>
            <p>What People are talking about</p>
          </div>
          <div>
            <p>Join a Conversation</p>
          </div>
        </div>
      </div>
      <div className="mainContent" style={{ justifyContent: "center" }}>
        <h1 style={{ width: "70%" }}>
          See What's Happening in the world right now
        </h1>
        <div className="input">
          <Input
            icon="mail"
            fluid
            placeholder="Email"
            error={!_emailValid}
            onChange={(e) => setEmail(e.target.value)}
            size="big"
          />
        </div>
        <div className="input">
          <Input
            icon="lock"
            fluid
            error={!_passwordValid}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            size="big"
          />
        </div>
        <div className="center">
          <Button color="black" onClick={onPressSignIn} animated>
            <Button.Content visible>
              <Icon name="sign-in" />
            </Button.Content>
            <Button.Content hidden>Login</Button.Content>
          </Button>
        </div>

        <div style={{ marginTop: "5%" }} className="center">
          <p>
            Don't Have an Account?{" "}
            <Link to={{ pathname: "/signup" }}>Sign Up</Link> Here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
