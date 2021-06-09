import React, { createContext, useState, useEffect } from "react";
import { LineaService } from "../services/lineaService";

export const LineaContext = createContext();

const LineaContextProvider = (props) => {
  const lineaService = new LineaService();

  const [lineas, setLineas] = useState([]);

  const [editLinea, setEditLinea] = useState(null);

  useEffect(() => {
    lineaService.getAll().then((data) => setLineas(data));
  }, []);
  const createLinea = (linea) => {
    lineaService
      .create(linea)
      .then((data) => setLineas([...lineas, data]));
  };

  const softDeleteLinea = (id) => {
    lineaService
      .softDelete(id)
      .then(() => setLineas(lineas.filter((p) => p.id !== id)));
  };

  const findLinea = (id) => {
    const linea = lineas.find((p) => p.id === id);

    setEditLinea(linea);
  };

  const updateLinea = (linea) => {
    lineaService
      .update(linea)
      .then((data) =>
        setLineas(
          lineas.map((p) => (p.id === linea.id ? data : linea))
        )
      );

    setEditLinea(null);
  };

  return (
    <LineaContext.Provider
      value={{
        createLinea,
        findLinea,
        updateLinea,
        softDeleteLinea,
        editLinea,
        lineas,
      }}
    >
      {props.children}
    </LineaContext.Provider>
  );
};

export default LineaContextProvider;
