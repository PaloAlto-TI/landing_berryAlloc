import React, { createContext, useState, useEffect } from "react";
import { ProductoService } from "../services/productoService";

export const ProductoContext = createContext();

const ProductoContextProvider = (props) => {
  
  
  const productoService = new ProductoService();
  
  const [productos, setProductos] = useState([]);

  const [editProducto, setEditProducto] = useState(null);

  useEffect(() => {
    productoService.getAll().then((data) => setProductos(data));
  }, []);
  const createProducto = (producto) => {
    productoService
      .create(producto)
      .then((data) => setProductos([...productos, data]));
  };

  // const deleteProducto = (id) => {
  //   productoService
  //     .delete(id)
  //     .then(() => setProductos(productos.filter((p) => p._id !== id)));
  // };

  const findProducto = (id) => {
    const producto = productos.find((p) => p._id === id);

    setEditProducto(producto);
  };

  const updateProducto = (producto) => {
    productoService
      .update(producto)
      .then((data) =>
        setProductos(
          productos.map((p) => (p._id === producto._id ? data : producto))
        )
      );

    setEditProducto(null);
  };

  return (
    <ProductoContext.Provider
      value={{
        createProducto,
        findProducto,
        updateProducto,
        editProducto,
        productos,
      }}
    >
      {props.children}
    </ProductoContext.Provider>
  );
};

export default ProductoContextProvider;