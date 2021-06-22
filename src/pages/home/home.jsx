import React from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import SideMenu from "../../components/menu/sidemenu";
import ProductoList from "../../components/productos/productoList/productoList";
import ProductoForm from "../../components/productos/productoForm/productoForm";
import ProductoContextProvider from "../../contexts/productoContext";
import { Layout } from "antd";
import "./home.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

const Home = () => {
  
  let { path, url } = useRouteMatch();
  
  return (
    <>
      <Header />
      <main>
        <SideMenu />
        <Router>
          <ProductoContextProvider Provider>
            <Switch>
              <Route exact path={`${path}/productos`}>
                <ProductoList />
              </Route>
              <Route exact path={`${path}/productos/producto`}>
                <ProductoForm />
              </Route>
              <Route exact path={`${path}`}>
                <Layout style={{ height: "70vh", backgroundColor: "white", justifyContent: "center",}}>
                  <span style={{ color: "black", fontSize: "45px", fontWeight: "bold", }}>
                    PRODUCTOS - PALO ALTO
                  </span>
                </Layout>
              </Route>
            </Switch>
          </ProductoContextProvider>
        </Router>
      </main>
      <Footer />
    </>
  );
};

export default Home;
