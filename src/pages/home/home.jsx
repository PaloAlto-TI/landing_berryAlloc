import React from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import ProductoList from "../../components/productos/productoList/productoList";
import ProductoContextProvider from "../../contexts/productoContext";
import "./home.css";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <ProductoContextProvider>
          <ProductoList />
        </ProductoContextProvider>
      </main>
      <Footer />
    </>
  );
};

export default Home;
