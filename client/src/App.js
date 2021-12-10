import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
