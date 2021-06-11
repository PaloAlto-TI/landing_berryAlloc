import React from "react";
import { GoogleLogin } from 'react-google-login';
//import UsuarioService from '../../services/Usuarios/UsuariosService';
// import { useState } from 'react';
import { usuarios } from "../../utils/Usuarios";
import "./login.css";
import { useHistory } from "react-router";
//import imagen from "./img/img1.gif";
import imagen from "./img/img2.ico";

import {  message } from 'antd';







const Login = () => {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }


  const responseGoogle = (response) => {
    let usuarioCheck = usuarios.find((u) => u.correo === response.profileObj.email);

    if (usuarioCheck) {
      localStorage.setItem('user', JSON.stringify(usuarioCheck));
      message.success('Permiso Concedido');
      handleClick();
    }
    else {
      message.error('Usuario no Registrado');
    }
  }

  //hola
  return (<div className="body1">




    {
      localStorage.getItem("user") === null ?
  
        



          <div className="box">
               <div className="ava">
          <img className="avatar" alt="img"  src={imagen} />
        </div>
          <h1 >Productos</h1>

   
          

           <div className="botonGoogle">
           

<GoogleLogin
  clientId="610747110294-o2cruk32qs9j2mi3o9ob1b7dpu4ib35u.apps.googleusercontent.com"
  buttonText="Google"
  onSuccess={responseGoogle}

  onFailure={responseGoogle}
  cookiePolicy={"single_host_origin"}
/>
             </div>
         
          </div>

        : handleClick()

    }

  </div>);
}

export default Login;

