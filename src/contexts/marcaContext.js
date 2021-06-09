import React, { createContext, useState, useEffect } from "react";
import { MarcaService } from "../services/marcaService";

export const MarcaContext = createContext();

const MarcaContextProvider = (props) => {
  const marcaService = new MarcaService();

  const [marcas, setMarcas] = useState([]);

  const [editMarca, setEditMarca] = useState(null);

  useEffect(() => {
    marcaService.getAll().then((data) => setMarcas(data));
  }, []);
  const createMarca = (marca) => {
    marcaService
      .create(marca)
      .then((data) => setMarcas([...marcas, data]));
  };

  const softDeleteMarca = (id) => {
    marcaService
      .softDelete(id)
      .then(() => setMarcas(marcas.filter((p) => p.id !== id)));
  };

  const findMarca = (id) => {
    const marca = marcas.find((p) => p.id === id);

    setEditMarca(marca);
  };

  const updateMarca = (marca) => {
    marcaService
      .update(marca)
      .then((data) =>
        setMarcas(
          marcas.map((p) => (p.id === marca.id ? data : marca))
        )
      );

    setEditMarca(null);
  };

  return (
    <MarcaContext.Provider
      value={{
        createMarca,
        findMarca,
        updateMarca,
        softDeleteMarca,
        editMarca,
        marcas,
      }}
    >
      {props.children}
    </MarcaContext.Provider>
  );
};

export default MarcaContextProvider;
