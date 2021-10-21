import React, { useEffect } from "react";


import "./productosHoja.css";

import ProductoList from "../../productos/productoList/visualizadores/hoja/productoHojaList";

const ProductosHoja = () => {
  
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  });


   
    return (
      <>
    
        <ProductoList
          visualizador={true}
        
        />
      </>
    );
  
};

export default ProductosHoja;
