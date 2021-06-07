import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProductoForm from "./components/productos/productoForm/productoForm";
import Home from "./pages/home/home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <ProductoForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
