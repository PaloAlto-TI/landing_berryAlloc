import React, { createContext, useState, useEffect } from "react";
import { ProductoService } from "../services/productoService";

export const ProductoContext = createContext();

const ProductoContextProvider = (props) => {
  const productoService = new ProductoService();

  const [productos, setProductos] = useState([]);

  const [editProducto, setEditProducto] = useState(null);

  useEffect(() => {
    productoService.getProductos().then((data) => setProductos(data));
  }, []);
  const createProducto = (producto) => {
    productoService
      .createProducto(producto)
      .then((data) => setProductos([...productos, data]));
  };

  const softDeleteProducto = (id) => {
    productoService
      .softDeleteProducto(id)
      .then(() => setProductos(productos.filter((p) => p.id !== id)));
  };

  const findProducto = (id) => {
    const producto = productos.find((p) => p.id === id);

    setEditProducto(producto);
  };

  const updateProducto = (producto) => {
    productoService
      .updateProducto(producto)
      .then((data) =>
        setProductos(
          productos.map((p) => (p.id === producto.id ? data : producto))
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
        softDeleteProducto,
        editProducto,
        productos,
      }}
    >
      {props.children}
    </ProductoContext.Provider>
  );
};

export default ProductoContextProvider;
