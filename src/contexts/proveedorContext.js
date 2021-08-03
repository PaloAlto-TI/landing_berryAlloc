import React, { createContext, useState, useEffect } from "react";
import { ProveedorService } from "../services/proveedorService";

export const ProveedorContext = createContext();

const ProveedorContextProvider = (props) => {
  
  
  const proveedorService = new ProveedorService();
  
  const [proveedores, setProveedores] = useState([]);
  const [proveedores_marcas_nn, set_proveedores_marcas_nn] = useState([]);
  const [editProveedor, setEditProveedor] = useState(null);
  const [permiso, setPermiso] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);


  useEffect(() => {
    proveedorService.getAll().then((data) => setProveedores(data));
    proveedorService.get_proveedores_marcas_nn().then((data) => set_proveedores_marcas_nn(data));
  }, []);


  // const createProveedor = (proveedor) => {
  //   proveedorService
  //     .createProveedor(proveedor)
  //     .then((data) => setProveedores([...proveedores, data]));
  // };

  const createProveedor = async(proveedor) => {
    const data = await proveedorService.create(proveedor);
    
    if (data.message === "OK CREATE") {
      proveedorService.getAll().then((data) => setProveedores(data));
    }
    return data;
  }

  const softDeleteProveedor = async(proveedor) => {

    const data = await proveedorService.softDelete(proveedor);

    if (data.message === "OK SOFTDELETE") {
      proveedorService.getAll().then((data) => { if (data.length===0) setIsEmpty(true) ; setProveedores(data)});
    }
    setEditProveedor(null);
    return data;
  };

  // const findProveedor = (id) => {
  //   const proveedor = proveedores.find((p) => p._id === id);

  //   setEditProveedor(proveedor);
  // };

  const findProveedor = (id) => {
    // console.log("EL ID PARA FINDMARCA: " + id);
    // const marca = marcas.find((m) => m.id === id)
    // console.log("LO QUE VA A MAPEAR EN FINDMARCA: " + marcas_lineas_nn.length);
    const proveedor = proveedores_marcas_nn.find((p) => p.id === id);

    if (proveedor){
      proveedor.marcas_nn_in = proveedor.marcas_nn.map(x=>x.id)
      setEditProveedor(proveedor);
    }

    /*
    const marca = marcas_lineas_nn.find((m) => m.id === id);
    if(marca){
      marca.newList = marcas_lineas_nn.lineas_nn.map(x=>x.id)
    }
    */
  };


  const updateProveedor = (proveedor) => {
    proveedorService
      .updateProveedor(proveedor)
      .then((data) =>
        setProveedores(
          proveedores.map((p) => (p._id === proveedor._id ? data : proveedor))
        )
      );

    setEditProveedor(null);
  };

  return (
    <ProveedorContext.Provider
      value={{
        createProveedor,
        findProveedor,
        updateProveedor,
        softDeleteProveedor,
        editProveedor,
        proveedores,
        proveedores_marcas_nn,
        permiso,
        setPermiso,
        setEditProveedor,
        isEmpty
      }}
    >
      {props.children}
    </ProveedorContext.Provider>
  );
};

export default ProveedorContextProvider;