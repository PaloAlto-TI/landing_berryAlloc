import React, { useEffect } from "react";
import { GoogleLogin } from 'react-google-login';
import { useState } from 'react';
//import UsuarioService from '../../services/Usuarios/UsuariosService';
// import { useState } from 'react';
import "./login.css";
import { useHistory } from "react-router";
//import imagen from "./img/img1.gif";
import imagen from "./img/img2.ico";
import { Button, message } from 'antd';
//import  { UsuarioService } from "/Users/Jonnathan/Documents/PALO ALTO PROJECTS/PRODUCTOS/PRODUCTOS_PA_FE/login/src/services/usuarioService";
//import { UsuarioService } from "/Users/Jonnathan/Documents/PALO ALTO PROJECTS/PRODUCTOS/PRODUCTOS_PA_FE/src/services/usuarioService";
import { UsuarioService } from "../../services/usuarioService";

// import { SesionService } from "/Users/Jonnathan/Documents/PALO ALTO PROJECTS/PRODUCTOS/PRODUCTOS_PA_FE/src/services/sesionService";
 import { SesionService } from "../../services/sesionService";

const Login = () => {
  let history = useHistory();
  const sesionService = new SesionService();
  //------------------------------------------------
  // const [sesionState, setSesionState] = useState({

  //   id_usuario: "",
  //   token_obj:
  //   {
  //     access_token: "",
  //     expires_at: null,
  //     expires_in: null,
  //     id_token: "",
  //     first_issued_at: null,
  //     idpId: "",
  //     login_hint: "",
  //     scope: "",

  //   },
  //   expires_at: null,
  //   expires_in: null,
  //   active: true,
  //   token: null


  // })

  //--------------------------------------------

  //----------------------------------------------
  // const [usuarioCheck, SetUsuarioCheck] = useState(null);
  // const [google, SetGoogle] = useState(null);

  //--------------------------------------------     

  function handleClick() {
    history.push("/home");
  }

  const ResponseGoogle = async (response) => {
    // console.log(response);
    const usuarioService = new UsuarioService();

    let res2;

    const res1 = (data) => { res2 = data; }
    //console.log(response);
    await usuarioService.getAll().then(data => res1(data));

    let usuarioCheck_1 = res2.find((u) => u.correo === response.profileObj.email);
    //SetUsuarioCheck(usuarioCheck_1);
    //SetGoogle(response);

    // console.log("usuariocheck:"+usuarioCheck_1);
    //console.log("usuarioresponse:"+JSON.stringify(response));
    if (usuarioCheck_1 && usuarioCheck_1.active === true) {

      let objeto={
        "id_usuario": usuarioCheck_1._id,
        "token_obj":
        {
          "access_token": response.tokenObj.access_token,
          "expires_at": response.tokenObj.expires_at,
          "expires_in": response.tokenObj.expires_in,
          "id_token": response.tokenObj.id_token,
          "first_issued_at": response.tokenObj.first_issued_at,
          "idpId": response.tokenObj.idpId,
          "login_hint": response.tokenObj.login_hint,
          "scope": response.tokenObj.scope,

        },
        "expires_at": response.tokenObj.expires_at,
        "expires_in": response.tokenObj.expires_in,
        "active": true,
        "token": response.tokenObj.access_token
      };
      //console.log("Entra en el bucle1");
      await localStorage.setItem('user', JSON.stringify(usuarioCheck_1));
      await localStorage.setItem('token', response.tokenObj.access_token);
      //console.log("Entra en el bucle2");
      //console.log("Entra en el bucle3: "+JSON.stringify(objeto));
      await sesionService.create(objeto);
      console.log("google:" + localStorage.getItem('token'));
     
     
      //------------------------------------------------------------------------
  
     
     

      //----------------------------------------------------
      //console.log(usuarioCheck_1);
      //console.log(response);
      //console.log(response.tokenObj);

      //console.log("SESION STATE:"+JSON.stringify(sesionState));


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

