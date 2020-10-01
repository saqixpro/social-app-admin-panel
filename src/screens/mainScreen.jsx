import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import NewPost from "./newPost";
import POD from "./pod";
import ManageUsers from "./manageUsers";
import ManagePosts from "./managePosts";
import "../styles/main.css";
import "../styles/sidebar.css";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

const MainScreen = () => {
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [_SIGNOUT, setsignout] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const _fetch_current_user = async () => {
    const user = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get();
    setCurrentUser({ ...user.data(), uid: user.id });
  };

  useEffect(() => {
    (() => {
      _fetch_current_user();
    })();
  }, []);

  const signOut = () => {
    setsignout(true);
    firebase.auth().signOut();
  };

  const CurrentScreen = () => {
    switch (activeScreen) {
      case "dashboard":
        return <Dashboard />;
      case "newpost":
        return <NewPost />;
      case "pod":
        return <POD />;
      case "manageusers":
        return <ManageUsers />;
      case "manageposts":
        return <ManagePosts />;
      default:
        return <Dashboard />;
    }
  };

  return _SIGNOUT ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : (
    <div className="container">
      <div className="_container">
        <div className="profile-container">
          <div className="avatar-container">
            {currentUser ? (
              currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <h1 className="logo-text">
                  {currentUser ? currentUser.name.charAt(0) : "T"}
                </h1>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <p className="username-text">
            {currentUser ? currentUser.name : "loading..."}
          </p>
        </div>
        <div className="buttonsList">
          <button
            className="button"
            onClick={() => setActiveScreen("dashboard")}
          >
            Dashboard
          </button>
          <button className="button" onClick={() => setActiveScreen("newpost")}>
            New Post
          </button>
          <button className="button" onClick={() => setActiveScreen("pod")}>
            POD
          </button>
          <button
            className="button"
            onClick={() => setActiveScreen("manageusers")}
          >
            Manage Users
          </button>
          <button
            className="button"
            onClick={() => setActiveScreen("manageposts")}
          >
            Manage Posts
          </button>
        </div>
        <div className="logoutContainer">
          <button className="logoutButton" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
      <CurrentScreen />
    </div>
  );
};

export default MainScreen;
