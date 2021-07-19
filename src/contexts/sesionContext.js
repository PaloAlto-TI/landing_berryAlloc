import React, { createContext, useState, useEffect } from "react";
import { SesionService } from "../services/sesionService";

export const SesionContext = createContext();

const SesionContextProvider = (props) => {
  const sesionService = new SesionService();

  const [sesiones, setSesiones] = useState([]);

  const [editSesion, setEditSesion] = useState(null);



  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    setIsEmpty(false)
    sesionService.getAll().then((data) => { if (data.length===0) setIsEmpty(true) ; setSesiones(data)});
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

    return data.message;
  };

  const softDeleteSesion = (sesion) => {
    sesionService
      .softDelete(sesion)
      .then(() => setSesiones(sesiones.filter((p) => p.id !== sesion.id)));
  };

  

  

  return (
    <SesionContext.Provider
      value={{
        
        usuario,
        softDeleteSesion,
        editSesion,
        sesiones,
        setEditSesion,
        isEmpty
      }}
    >
      {props.children}
    </SesionContext.Provider>
  );
};

export default SesionContextProvider;
