import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, SignUp } from "./screens";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact component={SignUp} path={`/signup`}>
          <SignUp />
        </Route>
        <Route exact component={Login} path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
