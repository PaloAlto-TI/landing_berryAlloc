import React, { createContext, useState, useEffect } from "react";
import { MarcaService } from "../services/marcaService";

export const MarcaContext = createContext();

const MarcaContextProvider = (props) => {

  const marcaService = new MarcaService();
  const [marcas, setMarcas] = useState([]);
  const [marcas_lineas_nn, set_marcas_lineas_nn] = useState([]);
  const [editMarca, setEditMarca] = useState(null);
  const [permiso, setPermiso] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // 28/07/2021 - OBSERVACIÓN: LA VARIABLE: marcasVW01 y el método: setMarcasVW01 deben nombrarse de mejor manera para guardar co-relación 
  // con lo que se está definiendo

  useEffect(() => {
    marcaService.getAll().then((data) => setMarcas(data));
    marcaService.get_marcas_lineas_nn().then((data) => set_marcas_lineas_nn(data));
  }, []);

  const createMarca = async(marca) => {
    const data = await marcaService.create(marca);
    // console.log("PASOO UN ERROR EN CREAR MARCAS: " + JSON.stringify(data));
    if (data.message === "OK CREATE") {
      marcaService.getAll().then((data) => setMarcas(data));
    }
    return data;
  }

  const softDeleteMarca = async(marca) => {

    const data = await marcaService.softDelete(marca);

    if (data.message === "OK SOFTDELETE") {
      marcaService.getAll().then((data) => { if (data.length===0) setIsEmpty(true) ; setMarcas(data)});
    }

    setEditMarca(null);
    return data;
    // marcaService
    //   .softDelete(id)
    //   .then(() => setMarcas(marcas.filter((p) => p.id !== id)));
    
  };

  const findMarca = (id) => {
    // console.log("EL ID PARA FINDMARCA: " + id);
    // const marca = marcas.find((m) => m.id === id)
    const marca = marcas_lineas_nn.find((m) => m.id === id);
    console.log(" FINDMARCA LO QUE DA: " + JSON.stringify(marca));
    setEditMarca(marca);
  };

  const updateMarca = async(marca) => {

    const data = await marcaService.update(marca);
    // console.log("LA DATA QUE REGRESA DE UPDATEMARCA : ", JSON.stringify(data));

    if (data.message === "OK UPDATE") {
      marcaService.getAll().then((data) => setMarcas(data));
    }
  
    setEditMarca(null);
    return data;

  };

  return (
    <MarcaContext.Provider value={{
        createMarca,
        findMarca,
        updateMarca,
        softDeleteMarca,
        editMarca,
        marcas,
        marcas_lineas_nn,
        permiso,
        setPermiso,
        setEditMarca,
        isEmpty
      }}
    >
      {props.children}
    </MarcaContext.Provider>
  );
};

export default MarcaContextProvider;
