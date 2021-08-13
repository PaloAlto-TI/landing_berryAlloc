import React from "react";
import './App.less';
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SesionContextProvider from "../../PRODUCTOS_PA_FE/src/contexts/sesionContext";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
         <Router>
         <SesionContextProvider Provider>
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
                <Redirect to="/home"/>
              </Route>
            </Switch>
            </SesionContextProvider>
          </Router>
    </div>
  );
}

export default App;
