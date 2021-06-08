import React, { createContext, useState, useEffect } from "react";
import { ProveedorService } from "../services/proveedorService";

export const ProveedorContext = createContext();

const ProveedorContextProvider = (props) => {
  
  
  const proveedorService = new ProveedorService();
  
  const [proveedores, setProveedores] = useState([]);

  const [editProveedor, setEditProveedor] = useState(null);

  useEffect(() => {
    proveedorService.getProveedores().then((data) => setProveedores(data));
  }, []);
  const createProveedor = (proveedor) => {
    proveedorService
      .createProveedor(proveedor)
      .then((data) => setProveedores([...proveedores, data]));
  };

  // const deleteProveedor = (id) => {
  //   proveedorService
  //     .delete(id)
  //     .then(() => setProveedors(proveedores.filter((p) => p._id !== id)));
  // };

  const findProveedor = (id) => {
    const proveedor = proveedores.find((p) => p._id === id);

    setEditProveedor(proveedor);
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
        editProveedor,
        proveedores,
      }}
    >
      {props.children}
    </ProveedorContext.Provider>
  );
};

export default ProveedorContextProvider;