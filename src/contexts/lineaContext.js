import React, { createContext, useState, useEffect } from "react";
import { LineaService } from '../services/lineaService';

export const LineaContext = createContext();

const LineaContextProvider = (props) => {

  const lineaService = new LineaService();
  const [lineas, setLineas] = useState([]);
  const [marcas_lineas_nn, set_marcas_lineas_nn] = useState([]);
  const [editLinea, setEditLinea] = useState(null);
  const [permiso, setPermiso] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect (() => {
    setIsEmpty(false);
    lineaService.getAll().then((data) => { if (data.length===0) setIsEmpty(true) ; setLineas(data)});
    lineaService.get_marcas_lineas_nn().then((data) => { if (data.length===0) setIsEmpty(true) ; set_marcas_lineas_nn(data)});
  }, []);

  const createLinea = async (linea) => {
    const data = await lineaService.create(linea);
    if (data.message === "OK CREATE") {
      lineaService.getAll().then((data) => setLineas(data));
    }
    return data;
  }

  const softDeleteLinea = async(linea) => {
     const data = await lineaService.softDelete(linea);
     if (data.message === "OK SOFTDELETE") {
      lineaService.getAll().then((data) => { if (data.length===0) setIsEmpty(true) ; setLineas(data)});
    }
    setEditLinea(null);
    // console.log("El ultimo mensaje del SOFTDELETE : ", data.message);
    return data;
  };

  const findLinea = (id) => {
    // // console.log("EL ID PARA FINDLINEA: " + id);
    // const linea = lineas.find((l) => l.id === id);
    // setEditLinea(linea);

    const linea = marcas_lineas_nn.find((l) => l.id === id);

    if (linea){
      linea.marcas_nn_in = linea.marcas_nn.map(x=>x.id)
      setEditLinea(linea);
    }
  };

  const updateLinea = async(linea) => {
    // console.log("VA HACER EL AWAIT DEL UPDATE LINEA DEL CONTEXT: ", linea);
    const data = await lineaService.update(linea);
    /// console.log("LA DATA QUE REGRESA DE UPDATELINEA : ", JSON.stringify(data));
    if (data.message === "OK UPDATE") {
      lineaService.getAll().then((data) => setLineas(data));
      // ACA VER TAMBIEN SI VA EL GET_MARCAS_LINEAS_NN
    }

    setEditLinea(null);
    return data;
  };

  return (
      <LineaContext.Provider value={{
          createLinea,
          findLinea,
          updateLinea,
          softDeleteLinea,
          editLinea,
          lineas,
          permiso,
          setPermiso,
          setEditLinea,
          isEmpty
      }}>
          {props.children}
      </LineaContext.Provider>
  );
};

export default LineaContextProvider;
