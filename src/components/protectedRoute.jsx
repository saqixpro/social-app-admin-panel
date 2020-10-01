import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import Loading from "./loading";

const ProtectedRoute = (props) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const Component = props.component;
  const veryifyAuthentication = () => {
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setAuthenticated(true);
          setLoading(false);
        } else {
          setLoading(false);
          setAuthenticated(false);
        }
      });
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    veryifyAuthentication();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div>
      {authenticated ? <Component /> : <Redirect to={{ pathname: "/login" }} />}
    </div>
  );
};

export default ProtectedRoute;
