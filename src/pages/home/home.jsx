import React from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import SideMenu from "../../components/menu/sidemenu";
import ProductoList from "../../components/productos/productoList/productoList";
import ProductoForm from "../../components/productos/productoForm/productoForm";
import ProductoContextProvider from "../../contexts/productoContext";

import LineaList from "../../components/lineas/lineaList/lineaList";
// import LineaForm from "../../components/lineas/lineaForm/";
import LineaContextProvider from "../../contexts/lineaContext";

import { Layout } from "antd";
import "./home.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

const Home = () => {
  
  let { path } = useRouteMatch();
  
  return (
    <>
      <Header />
      <main>
        <SideMenu />
        <Router>
        <Switch>
          <Route exact path={`${path}`}>
            <Layout style={{ height: "78.5vh", backgroundColor: "white", justifyContent: "center", }}>
              <span style={{ color: "black", fontSize: "45px", fontWeight: "bold", }}>
                PRODUCTOS - PALO ALTO
              </span>
            </Layout>
          </Route>
          <Route exact path={`${path}/productos`}>
            <ProductoContextProvider Provider>
              <ProductoList />
            </ProductoContextProvider>
          </Route>
          <Route path={`${path}/productos/:codigo`}>
            <ProductoContextProvider Provider>
                <ProductoForm />
            </ProductoContextProvider>
          </Route>
          <Route exact path={`${path}/lineas`}>
            <LineaContextProvider>
              <LineaList />
            </LineaContextProvider>
          </Route>
          <Route exact path={`${path}/marcas`}>
          <p>MARCAS</p>
          </Route>
          <Route path="*">
            <p>404 NOT FOUND</p>
          </Route>
          </Switch>
        </Router>
      </main>
      <Footer />
    </>
  );
};

export default Home;
