import React from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import ProductoList from "../../components/productos/productoList/productoList";
import ProductoForm from "../../components/productos/productoForm/productoForm";
import ProductoContextProvider from "../../contexts/productoContext";
import "./home.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <ProductoContextProvider>
          <Router>
            <Switch>
              <Route exact path="/productos">
                <ProductoList />
              </Route>
              <Route path="/producto">
                <ProductoForm/>
              </Route>
            </Switch>
          </Router>
        </ProductoContextProvider>
      </main>
      <Footer />
    </>
  );
};

export default Home;
