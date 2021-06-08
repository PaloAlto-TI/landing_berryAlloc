import React from "react";
import "./App.css";
import Home from "./pages/home/home";
// import ProductoContextProvider from "./contexts/productoContext";
import LineaContextProvider from "./contexts/lineaContext"

function App() {
  return (
    <div className="App" >
      <span>HOOOOOOOLA</span>
      <LineaContextProvider>
      <Home />
      </LineaContextProvider>
    </div> 

    /**<div className="App">
      <ProductoContextProvider>
        <Home />
      </ProductoContextProvider>
    </div>**/
  );
}

export default App;
