import React from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import LineaList from "../../components/lineas/lineaList/lineaList";
// import ProductoList from "../../components/productos/productoList/productoList";
// import ProductoForm from "../../components/productos/productoForm/productoForm";
// import ProductoContextProvider from "../../contexts/productoContext";
import LineaContextProvider from "../../contexts/lineaContext";
// import LineaList from "../../components/lineas/lineaList/lineaList";
import "./crud.css";

const Crud = () => {
  return (
    <>
      <Header />
      <main>
          <LineaContextProvider><span>AAAAAAAAA</span>
          <LineaList/>
          </LineaContextProvider>
          
      </main>
      <Footer />
    </>
  );
};

export default Crud;
