import React, { createContext, useState, useEffect } from "react";
import { ColorService } from "../services/colorService.js";

export const ModeloContext = createContext();

const ModeloContextProvider = (props) => {
  const colorService = new ColorService();
  const [modelos, setModelos] = useState([]);
  const [editModelo, setEditModelo] = useState(null);
  const [permiso, setPermiso] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty(false)
    // modeloService.getAll().then((data) => setModelos(data));
    // console.log("la data de context" + JSON.stringify(modeloService.getAll()));

    colorService.getAll().then((data) => { if (data.length===0) setIsEmpty(true) ; setModelos(data)});
    if (modelos.length === 0){
      setIsEmpty(true);
    }

  }, []);

//   const createModelo = async (modelo) => {
//     const data = await colorService.create(modelo);
//     console.log("err:", data);
//     if (data.message === "OK CREATE") {
//         colorService.getAll().then((data) => setModelos(data));
//       // setProductos([...productos, data.data]);
//     }
//     return data.message;
//   };
  const createModelo = async(modelo) => {
    console.log("LO QUE VIENE PAARA CREAR MODELO EM CONTEXT: " + JSON.stringify(modelo))

    const data = await colorService.create(modelo);
    
    if (data.message === "OK CREATE") {
        colorService.getAll().then((data) => setModelos(data));
        // grupoService.get_grupo_marcas_nn().then((data) => set_grupo_marcas_nn(data));
    }
    return data;
  }

  /*const findModelo = (id) => {
    
    const proveedor = proveedores_marcas_nn.find((p) => p.id === id);
    if (proveedor){
      proveedor.proveedor_marcas_nn_in = proveedor.proveedor_marcas_nn.map(x=>x.id)
      setEditProveedor(proveedor);
    }

  };*/
  const findModelo = (id) => {
    console.log("el id a buscar: " + id);
    const modelo = modelos.find((m) => m.id === id);
    setEditModelo(modelo);
  };

/*
  const softDeleteProducto = (producto) => {
    productoService
      .softDeleteProducto(producto)
      .then(() => {productoService.getProductos().then((data) => { if (data.length===0) setIsEmpty(true) ; setProductos(data)});
    });
      // .then(() => {setProductos(productos.filter((p) => p.id !== producto.id))});

  };*/

  /*const findModelo = (id) => {
    console.log(id);
    const producto = productos.find((p) => p.codigo_interno === id);
    setEditProducto(producto);
  };
*/
const updateModelo = async(modelo) => {

    console.log("LO QUE VIENE AL UPPDATEMODELO CONTEXT",modelo)
    const data = await colorService.update(modelo);
    // const data = await marcaService.update(marca);
    console.log("LA DATA QUE REGRESA DE UPDATEMODELO : ", JSON.stringify(data));

    if (data.message === "OK UPDATE") {
        colorService.getAll().then((data) => setModelos(data));
      // proveedorService.get_proveedores_marcas_nn().then((data) => set_proveedores_marcas_nn(data)); // PREGUNTAR SI VA ESTO O CÓMO DEBERÍA IR
    }

    setEditModelo(null);
    return data;
  };

  return (
    <ModeloContext.Provider
      value={{
        createModelo,
        findModelo,
        updateModelo,
        // softDeleteModelo,
        editModelo,
        modelos,
        permiso,
        setPermiso,
        setEditModelo,
        isEmpty
      }}
    >
      {props.children}
    </ModeloContext.Provider>
  );
};

export default ModeloContextProvider;
