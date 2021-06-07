import React from 'react'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import ProductoList from '../../components/productos/productoList/productoList';
import './home.css';


const Home = () => {
    return (
        <>
            <Header/>
            <main>
                <ProductoList/>
            </main>
            <Footer/>
        </>
    )
}

export default Home
