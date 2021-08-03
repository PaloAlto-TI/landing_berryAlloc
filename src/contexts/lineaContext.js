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
      // console.log("PASOO UN ERROR EN LINEAS: " + JSON.stringify(data));
      if (data.message === "OK CREATE") {
        lineaService.getAll().then((data) => setLineas(data));
      }
      return data;
    }

    const softDeleteLinea = async(linea) => {
      // console.log("ENTRA AL SOFT DELETE LINEA CONTEXT CON: " + JSON.stringify(linea));
       // lineaService
       //   .softDelete(linea)
       //   // .then(() => setLineas(lineas.filter((l) => l.id !== linea.id)));
       //   .then(() => {lineaService.getAll().then((data) => { if (data.length===0) setIsEmpty(true) ; setLineas(data)});
       // });

       const data = await lineaService.softDelete(linea);
       // console.log("LA DATA QUE REGRESA DE SOFTDELETELINEA : ", JSON.stringify(data));

       if (data.message === "OK SOFTDELETE") {
        lineaService.getAll().then((data) => { if (data.length===0) setIsEmpty(true) ; setLineas(data)});
      }

      setEditLinea(null);
      // console.log("El ultimo mensaje del SOFTDELETE : ", data.message);
      return data;

    };

    const findLinea = (id) => {
      // console.log("EL ID PARA FINDLINEA: " + id);
      const linea = lineas.find((l) => l.id === id);
      setEditLinea(linea);
    };

    const updateLinea = async(linea) => {
      // console.log("VA HACER EL AWAIT DEL UPDATE LINEA DEL CONTEXT: ", linea);
      const data = await lineaService.update(linea);
      /// console.log("LA DATA QUE REGRESA DE UPDATELINEA : ", JSON.stringify(data));

      if (data.message === "OK UPDATE") {
        lineaService.getAll().then((data) => setLineas(data));
      }
  
      setEditLinea(null);
      // console.log("El ultimo mensaje del update : ", data.message);
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
