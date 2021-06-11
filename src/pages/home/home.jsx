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
  useRouteMatch,
} from "react-router-dom";
import Login from "../login/login";

const { Content } = Layout;

const Home = () => {
  let { path, url } = useRouteMatch();

  console.log(path);
  return (
    <>
      <Header />
      <main>
        <SideMenu />
        <Router>
          <Switch>
            <ProductoContextProvider>
              <Route path={`${path}/productos`}>
                <ProductoList />
              </Route>
              <Route path={`${path}/productos/producto`}>
                <ProductoForm />
              </Route>
            </ProductoContextProvider>
            {/* <Route path="/productos">
                <ProductoList/>
              </Route> */}
            {/* <Route path="/login">
                <Login/>
              </Route> */}
            {/* <Route path="/home">
              <SideMenu />
              </Route> */}
            <Route path={`${path}`}>
              <Layout
                style={{
                  height: "60vh",
                  backgroundColor: "white",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "black",
                    fontSize: "45px",
                    fontWeight: "bold",
                  }}
                >
                  PRODUCTOS - PALO ALTO
                </span>
              </Layout>
            </Route>
          </Switch>
        </Router>
      </main>

      <Footer />
    </>
  );
};

export default Home;
