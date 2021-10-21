import React, { useEffect } from "react";


import "./productosPalo.css";

import ProductoListPalo from "../../productos/productoList/visualizadores/palo/productosPaloList";
import { Divider } from "antd";

const ProductosHoja = () => {
  
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  });


   
    return (
      <>
        <ProductoListPalo
          visualizador={true}
        
        />
      </>
    );
  
};

export default ProductosHoja;
