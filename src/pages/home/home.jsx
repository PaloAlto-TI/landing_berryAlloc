import React from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import SideMenu from "../../components/menu/sidemenu";
import ProductoList from "../../components/productos/productoList/productoList";
import ProductoForm from "../../components/productos/productoForm/productoForm";
import ProductoContextProvider from "../../contexts/productoContext";
import { Layout } from 'antd';
import "./home.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const { Content } = Layout;

const Home = () => {
  return (
    <>
      <Header />
      <main>
      <SideMenu />
        <ProductoContextProvider>
          <Router>
            <Switch>
              {/* <Route exact path="/">
                <ProductoList />
              </Route> */}
              <Route path="/producto">
                <ProductoForm/>
              </Route>
              {/* <Route path="/login">
                <Login/>
              </Route> */}
              {/* <Route path="/home">
              <SideMenu />
              </Route> */}
            </Switch>
          </Router>
        </ProductoContextProvider>
        <Layout style={{ height: '60vh', backgroundColor: 'white', justifyContent: 'center'}}>
           <span style={{ color: 'black', fontSize: '45px', fontWeight: 'bold'}}>PRODUCTOS - PALO ALTO</span>
        </Layout>
      </main>
      
      <Footer />
    </>
  );
};

export default Home;
