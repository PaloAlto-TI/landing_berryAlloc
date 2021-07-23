import React, { createContext, useState, useEffect } from "react";
import { SesionService } from "../services/sesionService";

export const SesionContext = createContext();

const SesionContextProvider = (props) => {
  const sesionService = new SesionService();

  const [sesiones, setSesiones] = useState([]);

  const [editSesion, setEditSesion] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false)
//------------------------------------------------------


  useEffect(async () => {
    
    // if (productos.length === 0){
    //   setIsEmpty(true);


    if(localStorage.getItem("token") && isEmpty===false)
    {

      const tok={"token":localStorage.getItem("token")};


    
    const data = await sesionService.getUsuario(tok);
    setSesiones(data);
    setIsEmpty(true);
    }
    // }

  }, []);
  
//----------------------------------------------------------------


  const usuario = async () => {
    const tok={"token":localStorage.getItem("token")};

    console.log("err1:", tok);
    const data = await sesionService.getUsuario(tok);

    console.log("err2:", data);

    if (data.message === "OK CREATE") {
      sesionService.getAll().then((data) => setSesiones(data));
      // setSesiones([...sesiones, data.data]);
    }

    return data;
  };

  const softDeleteSesion = (sesion) => {
    console.log("SESION:"+JSON.stringify(sesion));
    sesionService.softDelete(sesion)
     
  };

  return (
    <SesionContext.Provider
      value={{
        
        usuario,
        softDeleteSesion,
        editSesion,
        sesiones,
        setEditSesion,
      }}
    >
      {props.children}
    </SesionContext.Provider>
  );
};

export default SesionContextProvider;
