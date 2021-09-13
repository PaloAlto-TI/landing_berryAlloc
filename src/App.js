import React, { useEffect } from "react";
import './App.less';
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SesionContextProvider, { SesionContext } from "./contexts/sesionContext";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


function App() {

  
  return (
    <div className="App">
       <SesionContextProvider >
         <Router>
        
            <Switch>
            <Route exact path="/">
                <Login />
              </Route>
              <Route path="/home">
                {/* {localStorage.getItem("token")? */}
                <Home />
                 {/* : <Redirect to="/login"/> */}
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="*">
                <Redirect to="/home"/>
              </Route>
            </Switch>
            
          </Router>
          </SesionContextProvider>
    </div>
  );
}

export default App;

