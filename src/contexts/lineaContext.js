import React, { createContext, useState, useEffect } from "react";
import { LineaService } from '../services/lineaService';

export const LineaContext = createContext();

const LineaContextProvider = (props) => {

    const lineaService = new LineaService();
    const [lineas, setLineas] = useState([]);
    const [editLinea, setEditLinea] = useState(null);
    const [permiso, setPermiso] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect (() => {
      setIsEmpty(false);
      lineaService.getAll().then((data) => { if (data.length===0) setIsEmpty(true) ; setLineas(data)});
    }, []);

    const createLinea = async (linea) => {
      const data = await lineaService.create(linea);
      console.log("PASOO UN ERROR EN LINEAS: " + JSON.stringify(data));
      if (data.message === "OK CREATE") {
        lineaService.getAll().then((data) => setLineas(data));
        console.log("LO QUE ESTA DENTRO DEL GET ALL: " + setLineas(data))
      }
      return data.message;
    }

    const softDeleteLinea = (linea) => {
      lineaService
        .softDeleteLinea(linea)
        .then(() => setLineas(lineas.filter((l) => l.id !== linea.id)));
    };

    const findLinea = (id) => {
      console.log("EL ID PARA FINDLINEA: " + id);
      const linea = lineas.find((l) => l.codigo_interno === id);
      setEditLinea(linea);
    };

    const updateLinea = async(linea) => {
      const data = await lineaService.updateLinea(linea);

      console.log("Paso un err: ", data);
      if (data.message === "OK UPDATE") {
        lineaService.getAll().then((data) => setLineas(data));
      }
  
      setEditLinea(null);
      console.log("El ultimo mensaje del update : ", data.message);
      return data.message;
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
