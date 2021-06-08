import React, { createContext, useState, useEffect } from "react";
import { LineaService } from "../services/lineaService";

export const LineaContext = createContext();

const LineaContextProvider = (props) => {

    const lineaService = new LineaService();
    
    const [lineas, setLineas] = useState([]);
    
    const [editLinea, setEditLinea] = useState(null);

    useEffect (() => {
        lineaService.getLineas().then((data) => setLineas(data));
    }, []);

    const createLinea = (linea) => {
       lineaService
       .create(linea)
       .then((data) => setLineas([...lineas, data]));
     };

    const findLinea = (id) => {
      const linea = lineas.find((l) => l._id === id);
      setEditLinea(linea);
    };

    const updateLinea = (linea) => {
        lineaService
          .update(linea)
          .then((data) =>
            setLineas(
              lineas.map((l) => (l._id === linea._id ? data : linea))
            )
          );
        setEditLinea(null);
    };

    const softDeleteLinea = (id) => {
       lineaService
         .delete(id)
         .then(() => setLineas(lineas.filter((l) => l._id !== id)));
     };

    return (
        <LineaContextProvider value={{
            createLinea,
            findLinea,
            updateLinea,
            softDeleteLinea,
            editLinea,
            lineas
        }}>
            {props.children}
        </LineaContextProvider>
    );

};

export default LineaContextProvider;
