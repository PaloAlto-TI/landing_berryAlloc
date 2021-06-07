import React from "react";
import "./App.css";
import Home from "./pages/home/home";
import ProductoContextProvider from "./contexts/productoContext";

function App() {
  return (
    <div className="App">
      <ProductoContextProvider>
        <Home />
      </ProductoContextProvider>
    </div>
  );
}

export default App;
