import React from "react";
import { GoogleLogin } from 'react-google-login';
//import UsuarioService from '../../services/Usuarios/UsuariosService';
// import { useState } from 'react';
import "./login.css";
import { useHistory } from "react-router";
//import imagen from "./img/img1.gif";
import imagen from "./img/img2.ico";
import { Button, message } from 'antd';
//import  { UsuarioService } from "/Users/Jonnathan/Documents/PALO ALTO PROJECTS/PRODUCTOS/PRODUCTOS_PA_FE/login/src/services/usuarioService";
import { UsuarioService } from "/Users/Jonnathan/Documents/PALO ALTO PROJECTS/PRODUCTOS/PRODUCTOS_PA_FE/src/services/usuarioService";
import { SesionService } from "/Users/Jonnathan/Documents/PALO ALTO PROJECTS/PRODUCTOS/PRODUCTOS_PA_FE/src/services/sesionService";
import { useState } from 'react';

const Login = () => {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  const ResponseGoogle = async (response) => {
    // console.log(response);
    const usuarioService = new UsuarioService();
    const sesionService = new SesionService();


  


    let res2;

    const res1 = (data) => { res2 = data; }
    console.log(response);
    await usuarioService.getAll().then(data => res1(data));

    let usuarioCheck = res2.find((u) => u.correo === response.profileObj.email);

    console.log(usuarioCheck);
    if (usuarioCheck && usuarioCheck.active === true) {
      localStorage.setItem('user', JSON.stringify(usuarioCheck));
      console.log(response);
      message.success('Permiso Concedido');
      handleClick();
    }
    else {
      message.error('Usuario no Registrado');
    }
  }

  return (<div className="body1">

    {
      localStorage.getItem("user") === null ?
        <div className="box">
          <div className="ava">
            <img className="avatar" alt="img" src={imagen} />
          </div>
          <h1 >Productos</h1>

          {/* <form>
            <label for="username">Username</label>
            <input type="text" placeholder="Enter Username"></input>

            <label for="password">Password</label>
            <input type="password" placeholder="Enter Password"></input>
            <input type="submit" value="Log In"></input>


          </form> */}


          <div className="botonGoogle">
            <GoogleLogin
              clientId="610747110294-o2cruk32qs9j2mi3o9ob1b7dpu4ib35u.apps.googleusercontent.com"
              buttonText="Google"
              render={(renderProps) => (
                <Button className='googleButton' color='primary' onClick={renderProps.onClick} disabled={renderProps.disabled}  >
                  <img className="googleIcon" alt="img" src="https://img.icons8.com/material-outlined/50/000000/google-logo.png" />
                Entrar con Google
                </Button>
              )}
              onSuccess={ResponseGoogle}
              onFailure={ResponseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>

        </div>

        : handleClick()
    }

  </div>);
}

export default Login;

