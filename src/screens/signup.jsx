import React, { useEffect, useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { Hint } from "../components";
import { Button, Input, Icon } from "semantic-ui-react";
import languageJSON from "../constants/languageJSON.json";

const SignUp = () => {
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [c_password, set_c_passowrd] = useState(null);
  const [image, setImage] = useState(false);
  const [error, setError] = useState(null);
  const [_validName, setValidName] = useState(true);
  const [_validUsername, setValidUsername] = useState(true);
  const [_validEmail, setValidEmail] = useState(true);
  const [_validPassword, setValidPassword] = useState(true);
  const [_valid_c_password, set_valid_c_password] = useState(true);

  const onSubmit = () => {
    const nameValid = validateName();
    const usernameValid = validateUserName();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const c_password_valid = validateConfirmPassword();

    if (usernameValid)
      if (nameValid)
        if (emailValid)
          if (passwordValid)
            if (c_password_valid) {
              setError(null);
              alert(`All Good`);
            } else setError(languageJSON.INVALID_C_PASSWORD);
          else setError(languageJSON.INVALID_PASSWORD);
        else setError(languageJSON.INVALID_EMAIL);
      else setError(languageJSON.INVALID_NAME);
    else setError(languageJSON.INVALID_USERNAME);
  };

  const validateUserName = () => {
    // Must Be Validated From Firebase
    const isValid = true;
    setValidUsername(isValid);
    return isValid;
  };

  const validateEmail = () => {
    const validationExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isValid = validationExp.test(email);
    setValidEmail(isValid);
    return isValid;
  };

  const validatePassword = () => {
    const validationExp = /^[A-Za-z]\w{6,10}$/;
    const isValid = validationExp.test(password);
    setValidPassword(isValid);
    return isValid;
  };

  const validateConfirmPassword = () => {
    const isValid = password === c_password;
    set_valid_c_password(isValid);
    return isValid;
  };

  const validateName = () => {
    const validationExp = new RegExp("(?=.{8,})");
    const isValid = validationExp.test(name);
    setValidName(isValid);
    return isValid;
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
      <div className="mainContent">
        <div className="center">
          <Button color="black" animated>
            <Button.Content visible>
              <Icon name="image" />
            </Button.Content>
            <Button.Content hidden>Upload</Button.Content>
          </Button>
          <p style={{ marginTop: "1%", marginBottom: "1%" }}>Profile Picture</p>
        </div>
        {error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : null}
        <div className="input">
          <Input
            icon="user"
            fluid
            error={!_validUsername}
            onFocus={() => setError(null)}
            placeholder={"Username"}
            onChange={(e) => setUsername(e.target.value)}
            size="big"
          />
        </div>
        <div className="input">
          <Input
            icon="user"
            error={!_validName}
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            fluid
            size="big"
          />
        </div>
        <div className="input">
          <Input
            icon="mail"
            error={!_validEmail}
            placeholder="Email"
            size="big"
            fluid
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <Input
            icon="lock"
            size="big"
            error={!_validPassword}
            placeholder="Your Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            fluid
          />
        </div>
        <div className="input">
          <Input
            icon="lock"
            size="big"
            error={!_valid_c_password}
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => set_c_passowrd(e.target.value)}
            fluid
          />
        </div>
        <div className="center">
          <Button onClick={onSubmit} color="black" animated>
            <Button.Content visible>
              <Icon name="sign-in" />
            </Button.Content>
            <Button.Content hidden>Sign Up</Button.Content>
          </Button>
        </div>
        <div style={{ marginTop: "5%" }} className="center">
          <p>
            Already Have an Account? <Link to={{ pathname: "/" }}>Login</Link>{" "}
            Here{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
