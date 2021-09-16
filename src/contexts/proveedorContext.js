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
    
    // console.log("LO QUE VIENE PAARA CREAR PROVEEDOR EM CONTEXT")
    const data = await proveedorService.create(proveedor);
    

    if (data.message === "OK CREATE") {
      proveedorService.getAll().then((data) => setProveedores(data));
      proveedorService.get_proveedores_marcas_nn().then((data) => set_proveedores_marcas_nn(data));
    }
    return data;
  }

  const softDeleteProveedor = async(proveedor) => {

    const data = await proveedorService.softDelete(proveedor);

    if (data.message === "OK SOFTDELETE") {
      proveedorService.getAll().then((data) => { if (data.length===0) setIsEmpty(true) ; setProveedores(data)});
      proveedorService.get_proveedores_marcas_nn().then((data) => set_proveedores_marcas_nn(data));
    }
    setEditProveedor(null);
    return data;
  };

  const findProveedor = (id) => {
    const proveedor = proveedores_marcas_nn.find((p) => p.id === id);
    if (proveedor){
      proveedor.proveedor_marcas_nn_in = proveedor.proveedor_marcas_nn.map(x=>x.id)
      setEditProveedor(proveedor);
    }
  };

  const updateProveedor = async(proveedor) => {

    // console.log("LO QUE VIENE AL UPPDATEPROVEEDOR CONTEXT",proveedor)
    const data = await proveedorService.update(proveedor);
    // const data = await marcaService.update(marca);
    // console.log("LA DATA QUE REGRESA DE UPDATEPROVEEDOR : ", JSON.stringify(data));

    if (data.message === "OK UPDATE") {
      proveedorService.getAll().then((data) => setProveedores(data));
      proveedorService.get_proveedores_marcas_nn().then((data) => set_proveedores_marcas_nn(data)); // PREGUNTAR SI VA ESTO O CÓMO DEBERÍA IR
    }

    setEditProveedor(null);
    return data;
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