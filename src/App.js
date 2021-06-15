import React from "react";
import './App.less';
import Home from "./pages/home/home";
import Login from "./pages/login/login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
         <Router>
            <Switch>
            <Route exact path="/">
                <Login />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="*">
                <p>404 NOT FOUND</p>
              </Route>
            </Switch>
          </Router>
    </div>
  );
}

export default App;
