import React, { createContext, useState, useEffect } from "react";
import { GrupoService } from "../services/grupoService";

export const GrupoContext = createContext();

const GrupoContextProvider = (props) => {

  const grupoService = new GrupoService();
  const [grupos, setGrupos] = useState([]);
  const [grupo_marcas_nn, set_grupo_marcas_nn] = useState([]);
  const [editGrupo, setEditGrupo] = useState(null);
  const [permiso, setPermiso] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(async() => {
    await grupoService.getAll().then((data) => setGrupos(data));
    // console.log("useeffect");
   await grupoService.get_grupo_marcas_nn().then((data) => set_grupo_marcas_nn(data));
  }, []);

  const createGrupo = async(grupo) => {
    console.log("LO QUE VIENE PARA CREAR GRUPO EM CONTEXT: " + grupo)

    const data = await grupoService.create(grupo);
    
    if (data.message === "OK CREATE") {
        grupoService.getAll().then((data) => setGrupos(data));
        grupoService.get_grupo_marcas_nn().then((data) => set_grupo_marcas_nn(data));
    }
    return data;
  }

  const softDeleteGrupo = async(grupo) => {
    const data = await grupoService.softDelete(grupo);

    if (data.message === "OK SOFTDELETE") {
        grupoService.getAll().then((data) => { if (data.length===0) setIsEmpty(true) ; setGrupos(data)});
        grupoService.get_grupo_marcas_nn().then((data) => set_grupo_marcas_nn(data));
    }
    setEditGrupo(null);
    return data;
  };

  const findGrupo = (id) => {
    // console.log("LO QUE VA A MAPPEAR: " + JSON.stringify(grupo_marcas_nn))
    const grupo = grupo_marcas_nn.find((g) => g.id === id);
    // console.log("ACA SE DEBE ASIGNAR EL FK_LINEA_ID PARA EL FRONT Y TENGO: " + JSON.stringify(grupo_marcas_nn))
    if (grupo){
      // console.log("EL LENGTH= " + grupo.grupo_marcas_nn.length)
      grupo.grupo_marcas_nn_in = grupo.grupo_marcas_nn.map(x=>x.id)

      // console.log("LO QUE YA LE QUIERO ASIGNAR A FKLI: " + grupo.grupo_marcas_nn[0].grupo_marca.fk_linea_id)
      // 06/08/2021 - OBSERVACIÓN: ACÁ SE DEBE DEFINIR DE MEJOR MANERA LA ASIGNACION DEL FK_LINEA_ID -MC
      
      if (grupo.grupo_marcas_nn.length > 0){
        grupo.grupo_marcas_nn[0].grupo_marca.fk_linea_id ?
        grupo.fk_linea_id = grupo.grupo_marcas_nn[0].grupo_marca.fk_linea_id 
        : grupo.fk_linea_id = '';
      } else {
        grupo.fk_linea_id = '';
      }

      // console.log("LO QUE QUEDO va a mapear: " +  JSON.stringify(grupo.fk_subgrupo)) 

      if (grupo.fk_subgrupo){
        grupo.fk_subgrupo_nombre = grupo.fk_subgrupo.nombre 
      } else {
        grupo.fk_subgrupo_nombre = '';
      }

      // console.log("LO QUE QUEDO EN SUBGRUPO NAME: " +  grupo.fk_subgrupo_nombre)
      // grupo.fk_linea_id = grupo.grupo_marcas_nn[0].grupo_marca.fk_linea_id
      // editGrupo.grupo_marcas_nn[0].grupo_marca.fk_linea_id
      // editGrupo.grupo_marcas_nn[0].grupo_marca.fk_linea_id

      setEditGrupo(grupo);
    }
    setEditGrupo(grupo);

  };

  const updateGrupo = async(grupo) => {

    const data = await grupoService.update(grupo);
    
    if (data.message === "OK UPDATE") {
        grupoService.getAll().then((data) => setGrupos(data));
        grupoService.get_grupo_marcas_nn().then((data) => set_grupo_marcas_nn(data));
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
        grupo_marcas_nn,
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
