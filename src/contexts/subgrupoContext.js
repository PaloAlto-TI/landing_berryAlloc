
import React, { createContext, useState, useEffect } from "react";
import { SubgrupoService } from "../services/subgrupoService";

export const SubgrupoContext = createContext();

const SubgrupoContextProvider = (props) => {
  const subgrupoService = new SubgrupoService();
  const [subgrupos, setSubgrupos] = useState([]);
  const [subgruposQR, setSubgruposQR] = useState([]);
  const [editSubgrupo, setEditSubgrupo] = useState(null);
  const [permiso, setPermiso] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {

    setIsEmpty(false)
    //subgrupoService.getSubgrupos({ linea_id :"60d4c046e600f1b5e85d075c"}).then((data) => { if (data.length===0) setIsEmpty(true) ; setSubgrupos(data)});
    subgrupoService.getAll().then((data) => setSubgrupos(data));
    //subgrupoService.getAllQR().then((data) => setSubgruposQR(data));
    // if (subgrupos.length === 0){
    //   setIsEmpty(true);
    // }

  }, []);

  const filterSubgrupos = async (id) => {
    console.log("tttttttttttttttttt")
    setSubgrupos([]);
    setIsEmpty(false);
    if (id === "all") {
      subgrupoService.getAllSubgrupos().then((data) => { if (data.length === 0) setIsEmpty(true); setSubgrupos(data) });
    } else {
      subgrupoService.getSubgrupos({ linea_id: id }).then((data) => { if (data.length === 0) setIsEmpty(true); setSubgrupos(data) });
    }
  }

  const createSubgrupo = async (subgrupo) => {
    const data = await subgrupoService.create(subgrupo);

    if (data.message === "OK CREATE") {
    subgrupoService.getAll().then((data) => setSubgrupos(data));
    // setSubgrupos([...subgrupos, data.data]);
    }

    return data;
  };

  const softDeleteSubgrupo = async (subgrupo) => {
    subgrupoService
      .softDelete(subgrupo)
      .then(() => {
        subgrupoService.getAll().then((data) => {
          if (data.length === 0) {
            setIsEmpty(true)
            return data;
          }
        else {
            setSubgrupos(data);
            return data;
          }
        });
      });
  };

  const findSubgrupo = async (id) => {
    //const subgrupo = await subgrupos.find((p) => p.codigo_interno === id);
    // ---const subgrupo = await subgrupos.find((p) => p.id === id);
    //console.log(subgrupo);
    //console.log("entra en find");
    //---- await setEditSubgrupo(subgrupo);
    const subgrupo = subgrupos.find((s) => s.id === id);

    if (subgrupo){
      setEditSubgrupo(subgrupo);
    }
  };

  const updateSubgrupo = async (subgrupo) => {
    
    const data = await subgrupoService.update(subgrupo);

    if (data.message === "OK UPDATE") {
      // subgrupoService.getSubgrupos().then((data) => setSubgrupos(data));
      subgrupoService.getAll().then((data) => setSubgrupos(data));
      //setSubgrupos(subgrupos.map((p) => (p.id === subgrupo.id ? data.data : p)))
    }
    
    setEditSubgrupo(null);
    return data;
  };

  return (
    <SubgrupoContext.Provider
      value={{
        createSubgrupo,
        //subgruposQR,
        findSubgrupo,
        updateSubgrupo,
        softDeleteSubgrupo,
        editSubgrupo,
        subgrupos,
        permiso,
        setPermiso,
        setEditSubgrupo,
        isEmpty,
        filterSubgrupos
      }}
    >
      {props.children}
    </SubgrupoContext.Provider>
  );
};

export default SubgrupoContextProvider;
