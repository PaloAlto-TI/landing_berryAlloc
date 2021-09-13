import React, { createContext, useState, useEffect } from "react";
import { ProductoService } from "../services/productoService";

export const ProductoContext = createContext();

const ProductoContextProvider = (props) => {
  const productoService = new ProductoService();
  const [productos, setProductos] = useState([]);
  const [editProducto, setEditProducto] = useState(null);
  const [permiso, setPermiso] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false)
  const [linea, setLinea] = useState(null)

  useEffect(() => {
    setIsEmpty(false)
    if (props.value){
      productoService.getProductos({ linea_id :"60d4c046e600f1b5e85d075c"}).then((data) => { if (data.length===0) setIsEmpty(true) ; setProductos(data);});
    }
    
    
    // if (productos.length === 0){
    //   setIsEmpty(true);
    // }

  }, []);

  const filterProductos = async (id) => {
    setProductos([]);
    setIsEmpty(false);
    if (id === "all"){
      productoService.getAllProductos().then((data) => { if (data.length===0) setIsEmpty(true) ; setProductos(data)});
    }else{
      productoService.getProductos({ linea_id : id}).then((data) => { if (data.length===0) setIsEmpty(true) ; setProductos(data)});
    }
  }

  const createProducto = async (producto) => {
    const data = await productoService.createProducto(producto);
    
    console.log("err:", data);
    if (data.message === "OK CREATE") {
      productoService.getProductos({ linea_id : producto.fk_linea_id}).then((data) => setProductos(data));
      // setProductos([...productos, data.data]);
    }

    return data.message;
  };

  const softDeleteProducto = async (producto) => {
    const data = await productoService
      .softDeleteProducto(producto);

    productoService.getProductos({ linea_id : producto.fk_linea_id}).then((data) => { if (data.length===0) setIsEmpty(true) ; setProductos(data)})
      // .then(() => {setProductos(productos.filter((p) => p.id !== producto.id))});

    return data;

  };

  const getSerialModelo = async (id) => {
    const data = await productoService.getSerialModelo(id);

    return data[0].serial;
  }


  const findProducto = async (id) => {

    console.log(id);
    const producto = await productoService.getOneProductos(id).then((data) =>  {setEditProducto(data[0])});


  };

  const updateProducto = async(producto) => {
   
    const data = await productoService.updateProducto(producto);

    console.log("err:", data);
    if (data.message === "OK UPDATE") {
      productoService.getProductos({linea_id : producto.fk_linea_id}).then((data) => setProductos(data));
      //setProductos(productos.map((p) => (p.id === producto.id ? data.data : p)))
    }

    // setEditProducto(null);

    return data.message;

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
        permiso,
        setPermiso,
        setEditProducto,
        isEmpty,
        filterProductos, 
        getSerialModelo,
      }}
    >
      {props.children}
    </ProductoContext.Provider>
  );
};

export default ProductoContextProvider;
