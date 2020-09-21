import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import AuthContext from "../contexts/auth.context";

import { Login, Signup } from "../screens";
import { BookList, BookNew, BookEdit } from "../screens/books";

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
        {/* Default route */}
        <Route component={() => <Redirect to="/login" />} />
      </Switch>
    </Router>
  );
};

const AuthRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <BookList />
        </Route>
        <Route path="/new">
          <BookNew />
        </Route>
        <Route path="/:id/edit">
          <BookEdit />
        </Route>
        {/* Default route */}
        <Route component={() => <Redirect to="/new" />} />
      </Switch>
    </Router>
  );
};

const Routes = () => {
  const { token } = useContext(AuthContext);
  return token ? <AuthRoutes /> : <GuestRoutes />;
};

export default Routes;
