import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Login, Signup } from "../screens";

const GuestRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect to="/login" from="/" exact />
      </Switch>
    </Router>
  );
};

export default GuestRoutes;
