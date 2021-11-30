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
          <Route path="/" exact component={goToRoomInput} />
          <Route path="/:roomId" exact component={Video} />
          {/* <Redirect path="/login" to="/:roomId" exact component={video} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
