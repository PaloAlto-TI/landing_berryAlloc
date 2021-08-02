import React, { createContext, useState, useEffect } from "react";
import { GrupoService } from "../services/grupoService";

export const GrupoContext = createContext();

const GrupoContextProvider = (props) => {

  const grupoService = new GrupoService();
  const [grupos, setGrupos] = useState([]);
  // const [marcas_lineas_nn, set_marcas_lineas_nn] = useState([]);
  const [editGrupo, setEditGrupo] = useState(null);
  const [permiso, setPermiso] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);


  useEffect(() => {
    grupoService.getAll().then((data) => setGrupos(data));
    // gruposService.get_marcas_lineas_nn().then((data) => set_marcas_lineas_nn(data));
  }, []);

  const createGrupo = async(grupo) => {
    const data = await grupoService.create(grupo);
    
    if (data.message === "OK CREATE") {
        grupoService.getAll().then((data) => setGrupos(data));
    }
    return data;
  }

  const softDeleteGrupo = async(grupo) => {
    const data = await grupoService.softDelete(grupo);

    if (data.message === "OK SOFTDELETE") {
        grupoService.getAll().then((data) => { if (data.length===0) setIsEmpty(true) ; setGrupos(data)});
    }
    setEditGrupo(null);
    return data;
  };

  const findGrupo = (id) => {
    // const marca = marcas_lineas_nn.find((m) => m.id === id);
    const grupo = grupos.find((g) => g.id === id);

    // if (grupo){
    //   marca.lineas_nn_in = marca.lineas_nn.map(x=>x.id)
    //   setEditMarca(marca);
    // }

    /*
    const marca = marcas_lineas_nn.find((m) => m.id === id);
    if(marca){
      marca.newList = marcas_lineas_nn.lineas_nn.map(x=>x.id)
    }
    */
    setEditGrupo(grupo);
  };

  const updateGrupo = async(grupo) => {

    const data = await grupoService.update(grupo);
    
    if (data.message === "OK UPDATE") {
        grupoService.getAll().then((data) => setGrupos(data));
    }

    setEditGrupo(null);
    return data;
  };

  return (
    <GrupoContext.Provider value={{
        createGrupo,
        findGrupo,
        updateGrupo,
        softDeleteGrupo,
        editGrupo,
        grupos,
        // marcas_lineas_nn,
        permiso,
        setPermiso,
        setEditGrupo,
        isEmpty
      }}
    >
      {props.children}
    </GrupoContext.Provider>
  );
};

export default GrupoContextProvider;
