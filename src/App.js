import React, { useEffect } from "react";
import './App.less';
import Home from "./pages/home/home";
import Landing from "./pages/landing/landing";
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
                <Landing />
              </Route>

              <Route path="/home">
                <Landing />
              </Route>

              <Route path="/home">
                <Landing/>
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

