import React from "react";
import "./App.css";
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
              <Route path="/Home">
                <Home />
              </Route>
              <Route path="/Login">
                <Login/>
              </Route>
            </Switch>
          </Router>
    </div>
  );
}

export default App;
