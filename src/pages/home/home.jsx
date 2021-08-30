import React, { useContext, useEffect, useState } from "react";
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
import ProveedorList from "../../components/proveedores/proveedorList/proveedorList";
import ProveedorForm from "../../components/proveedores/proveedorForm/proveedorForm";
import ProveedorContextProvider from "../../contexts/proveedorContext";
import GrupoList from "../../components/grupos/grupoList/grupoList";
import GrupoForm from "../../components/grupos/grupoForm/grupoForm";
import GrupoContextProvider from "../../contexts/grupoContext";
import ModeloList from "../../components/modelo/modeloList/modeloList";
import ModeloForm from "../../components/modelo/modeloForm/modeloForm";
import ModeloContextProvider from "../../contexts/modeloContext";


import { Layout } from "antd";
import "./home.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import { ConfigProvider } from 'antd';
import es_ES from 'antd/es/locale/es_ES';
import SubgrupoForm from "../../components/subgrupo/subgrupoForm/subgrupoForm";
import { SubgrupoList } from "../../components/subgrupo/subgrupoList/subgrupoList";
import SubgrupoContextProvider from "../../contexts/subgrupoContext";
const Home = () => {

  let { path } = useRouteMatch();

  return (
    <>
      <Header />
      <main>
        <SideMenu />
        <Router>
          <Switch>
            <Route exact path={`${path}/productos`}>
              <ConfigProvider locale={es_ES}>
                <ProductoContextProvider value={true}>
                  <ProductoList />
                </ProductoContextProvider>
              </ConfigProvider>
            </Route>
            <Route path={`${path}/productos/:codigo?/:operacion?`}>
              <ProductoContextProvider value={false}>
                <ProductoForm />
              </ProductoContextProvider>
            </Route>
            <Route exact path={`${path}`}>
              <Layout style={{ height: "62vh", backgroundColor: "white", justifyContent: "center", }}>
                <span style={{ color: "black", fontSize: "45px", fontWeight: "bold", }}>
                  PRODUCTOS - PALO ALTO
                </span>
              </Layout>
            </Route>
          </Switch>
          <Switch>
            <Route exact path={`${path}/lineas`}>
              <LineaContextProvider Provider>
                <LineaList />
              </LineaContextProvider>
            </Route>
            <Route path={`${path}/lineas/:codigo?/:operacion?`}>
              <LineaContextProvider Provider>
                <LineaForm />
              </LineaContextProvider>
            </Route>
          </Switch>
          <Switch>
            <Route exact path={`${path}/marcas`}>
              <MarcaContextProvider Provider>
                <MarcaList />
              </MarcaContextProvider>
            </Route>
            <Route path={`${path}/marcas/:codigo?/:operacion?`}>
              <MarcaContextProvider Provider>
                <MarcaForm />
              </MarcaContextProvider>
            </Route>
          </Switch>
          <Switch>
            <Route exact path={`${path}/proveedores`}>
              <ProveedorContextProvider Provider>
                <ProveedorList />
              </ProveedorContextProvider>
            </Route>
            <Route path={`${path}/proveedores/:codigo?/:operacion?`}>
              <ProveedorContextProvider Provider>
                <ProveedorForm />
              </ProveedorContextProvider>
            </Route>
          </Switch>
          <Switch>
            <Route exact path={`${path}/grupos`}>
              <GrupoContextProvider Provider>
                <GrupoList />
              </GrupoContextProvider>
            </Route>
            <Route path={`${path}/grupos/:codigo?/:operacion?`}>
              <GrupoContextProvider Provider>
                <GrupoForm />
              </GrupoContextProvider>
            </Route>
          </Switch>
          <Switch>
            <Route exact path={`${path}/modelos`}>
              <ModeloContextProvider Provider>
                <ModeloList />
              </ModeloContextProvider>
            </Route>
            <Route path={`${path}/modelos/:codigo?/:operacion?`}>
              <ModeloContextProvider Provider>
                <ModeloForm />
              </ModeloContextProvider>
            </Route>
          </Switch>
            <Switch>
              <Route exact path={`${path}/subgrupo`}>
              <SubgrupoContextProvider>
                <SubgrupoList />
                </SubgrupoContextProvider>
              </Route>
              <Route path={`${path}/subgrupo/:codigo?/:operacion?`}>
              <SubgrupoContextProvider>
                <SubgrupoForm />
                </SubgrupoContextProvider>
              </Route>
            </Switch>
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
