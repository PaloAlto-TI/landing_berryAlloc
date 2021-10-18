import React, { createContext, useState, useEffect } from "react";
import { SesionService } from "../services/sesionService";
import { message } from 'antd';
import { useHistory } from "react-router";



export const SesionContext = createContext();

const SesionContextProvider = (props) => {
  //let history = useHistory();
  const sesionService = new SesionService();

  const [sesions, setSesions] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [ismoved, setMoved] = useState(false);
  //------------------------------------------------------


  useEffect(async () => {

    if (localStorage.getItem("token")) {// SE VALIDA SI EXISTE ALGO EN LOCAL STORAGE

      const tok = { "token": localStorage.getItem("token") };
      let data = await usuario(tok);


      if (!sesions) {// VALIDA QUE LA VARIABLE SESIONS ESTE VACIA
        if (data) { //DATA ES EL RESULTADO DE BUSCAR EL TOKEN EN EL REGISTRO DE SESIONES
          setMoved(true);
         // console.log("prueba data " + JSON.stringify(sesions));
          setSesions(data);

          setIsLogged(true);
         // console.log("prueba data " + data);
          

          if (new Date().getTime() > (new Date(data.fecha).getTime() + data.time_out)) {
            LogOut();
            setIsLogged(false);
          }
        }
        else {// SI NO ENCONTRO NADA EN LA BUSQUEDA DEL TOKEN
          localStorage.clear() //PRIMERO ELIMINA LOCAL STORAGE (LOCAL STORAGE NO DISPARA EL RENDERIZADO CONDICIONAL Y TAMPOCO EL USEEFFECT POR ESTO ES NECESARIO SETTEAR SESIONS(O HACER ALGUN CAMBIO EN ALGUNA VARIABLE DEL ARRAY DE CONTROL DEL USEEFFECT) PARA QUE DISPARE EL RENDERIZADO CONDICIONAL Y POR CONSIGUIENTE EL USE EFFECT)
          setSesions(null); // ESTA FUNCION DISPARA ESTE USE EFFECT OTRA VEZ PARA QUE EN HOME ENTRE A LA COMPARACION DE LOCAL STORAGE Y REDIRECCIONE A LOGIN
        }
      }
    }
    else {
      setIsLogged(true);
    }
  }, [sesions, ismoved, setSesions, isLogged]);

  //----------------------------------------------------------------



  const LogOut = async () => {
    //sesionService.softDelete(sesion);

    const tok = { "token": localStorage.getItem("token") };
    const data = await sesionService.getUsuario(tok);

    await softDeleteSesion(data);
    localStorage.clear();

    message.success('Ha salido con éxito');
    setSesions();
    setMoved(false);
    //history.push("/login");
    // console.log("cookies:"+ document.cookie.split(";"));
    //document.cookie = "userId=nick123";


    //removeCookies();

    //setSesions(data);
    // console.log("Entra en sesion");
    // setSesiones([...sesiones, data.data]);


    return data;
  };




  const usuario = async () => {
    const tok = { "token": localStorage.getItem("token") };

    const data = await sesionService.getUsuario(tok);
    //setSesions(data);
    // console.log("Entra en sesion");
    // setSesiones([...sesiones, data.data]);


    return data;
  };

  const softDeleteSesion = (sesion) => {
    //console.log("SESION:"+JSON.stringify(sesion));
    sesionService.softDelete(sesion);
    setIsLogged(false);

  };

  return (
    <SesionContext.Provider
      value={{
        redirect,
        isLogged,
        usuario,
        softDeleteSesion,
        setIsLogged,
        sesions,
        LogOut,
        setMoved

      }}
    >
      {props.children}
    </SesionContext.Provider>
  );
};

export default SesionContextProvider;
