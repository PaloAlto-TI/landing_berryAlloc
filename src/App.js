import React from "react";
import './App.less';
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SesionContextProvider from "./contexts/sesionContext";
import {createStore} from 'redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {

  const store = createStore((state = initialEntries, action)=>{
    
    console.log(action);
    return state;
  })

  console.log("STORE",store.getState())

  store.dispatch({type : 'ADD_ENTRY'})

  console.log('STORE AFTER', store.getState() )

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

const initialEntries = [
  {
    "id": 1,
    "description": "Income Rent"
  },
  {
    "id": 2,
    "description": "Power Water"
  },
  {
    "id": 3,
    "description": "Rent"
  },
  {
    "id": 4,
    "description": "Power bill"
  },
  {
    "id": "e8805fe8-d9c3-4c8f-8e17-1cfbf33dee1e",
    "description": "This entry should show now"
  },
  {
    "id": "e615d0f7-d83b-4153-a1e2-b4329f1c5c3b",
    "description": "Another entry to show now"
  }
]