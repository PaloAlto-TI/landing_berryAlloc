import React from "react";
import "./App.css";
import Home from "./pages/home/home";
import Login from "./pages/login/login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProductoList from "./components/productos/productoList/productoList";
import ProductoContextProvider from "./contexts/productoContext";

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
              <Route  path="/productos">
               <ProductoContextProvider>
                <ProductoList />
                </ProductoContextProvider>
              </Route> 

              {/* <Route  path="/productos">
                <ProductoContextProvider>
                <ProductoList />
                </ProductoContextProvider>
              </Route>  */}
            </Switch>
          </Router>
    </div>
  );
}

export default App;
