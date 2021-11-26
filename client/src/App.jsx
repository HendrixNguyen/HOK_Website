import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import login from "./pages/login";
import signup from "./pages/signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={login} />
          <Route path="/signup" component={signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
