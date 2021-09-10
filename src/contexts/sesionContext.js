import React, { createContext, useState, useEffect } from "react";
import { SesionService } from "../services/sesionService";
import {  message } from 'antd';
import { useHistory } from "react-router";



export const SesionContext = createContext();

const SesionContextProvider = (props) => {
  let history = useHistory();
  const sesionService = new SesionService();

  const [sesions, setSesions] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [ismoved, setMoved] = useState(false);
  //------------------------------------------------------


  useEffect(async () => {
    
    // if (productos.length === 0){
    //   setIsEmpty(true);
    //console.log("imprime token :"+localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      
      const tok = { "token": localStorage.getItem("token") };
      let data = await usuario(tok);
      console.log("prueba data "+data);
      
      
      console.log("prueba sesions "+JSON.stringify(sesions));
      //console.log("Entra en effect service1 " + JSON.stringify(sesions));

      if (sesions==="CONSULTA" || !sesions) {
        if(data){
          setMoved(true);
          console.log("prueba data "+JSON.stringify(sesions));
        setSesions(data);
        setIsLogged(true);
        //console.log("fecha ahora:"+new Date()+"milisegundos ahora"+ new Date().getTime())
        //console.log("fecha salir:"+new Date( (new Date(data.fecha).getTime() + data.time_out))+"milisegundos para salir"+  (new Date(data.fecha).getTime() + data.time_out))
        
        if (  new Date().getTime() > (new Date(data.fecha).getTime() + data.time_out) )
        { 
          LogOut();
          setIsLogged(false);

          
          



        }
      }
      else{
        
        setSesions(null);
        localStorage.clear()
      
      }



      }
     // else{if(!sesions._usuario[0]){window.location.reload()}}




     // console.log("Entra en effect service2 " + new Date(JSON.stringify(data.fecha)));
      //console.log("Entra en effect service3 " + new Date(new Date(data.fecha).getTime() + data.time_out));
    }
    else {
      setIsLogged(true);

    }
    // }

  //},[localStorage.getItem("token"),sesions],ismoved);
},[localStorage,sesions,ismoved,setSesions,isLogged]);

  //----------------------------------------------------------------

  
  
  const LogOut = async () => {
    //sesionService.softDelete(sesion);

    const tok = { "token": localStorage.getItem("token") };
    const data = await sesionService.getUsuario(tok);

    await softDeleteSesion(data);
    localStorage.clear();
   
    message.success('Log Out');
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
