import React from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import SideMenu from "../../components/menu/sidemenu";
import ProductoList from "../../components/productos/productoList/productoList";
import ProductoForm from "../../components/productos/productoForm/productoForm";
import ProductoContextProvider from "../../contexts/productoContext";
import LineaList from "../../components/lineas/lineaList/lineaList";
import LineaForm from "../../components/lineas/lineaForm/lineaForm";
import LineaContextProvider from "../../contexts/lineaContext";
import MarcaList from "../../components/marcas/marcaList/marcaList";
import MarcaForm from "../../components/marcas/marcaForm/marcaForm";
import MarcaContextProvider from "../../contexts/marcaContext";

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
          <ProductoContextProvider Provider>
            <Switch>
              <Route exact path={`${path}/productos`}>
                <ProductoList />
              </Route>
              <Route path={`${path}/productos/:codigo?/:operacion?`}>
                <ProductoForm />
              </Route>
              <Route exact path={`${path}`}>
                <Layout style={{ height: "62vh", backgroundColor: "white", justifyContent: "center",}}>
                  <span style={{ color: "black", fontSize: "45px", fontWeight: "bold", }}>
                    PRODUCTOS - PALO ALTO
                  </span>
                </Layout>
              </Route>
            </Switch>
          </ProductoContextProvider>
          <LineaContextProvider Provider>
          <Switch>
          <Route exact path={`${path}/lineas`}>
              <LineaList />
          </Route>
          <Route path={`${path}/lineas/:codigo?/:operacion?`}>
              <LineaForm />
          </Route>
          </Switch>
            </LineaContextProvider>
          <MarcaContextProvider Provider>
          <Switch>
          <Route exact path={`${path}/marcas`}>
              <MarcaList />
          </Route>
          <Route path={`${path}/marcas/:codigo?/:operacion?`}>
              <MarcaForm />
          </Route>
          </Switch>
          </MarcaContextProvider>
            <Route exact path={`${path}/grupos`}>
              <p>GRUPOS</p>
            </Route>
            
            {/*<Route path="*">
              <p>404 NOT FOUND</p>
  </Route>*/}
        </Router>
      </main>
      <Footer />
    </>
  );
};

export default Home;
