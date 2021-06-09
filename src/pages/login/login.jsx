import React from "react";
import { GoogleLogin } from 'react-google-login';
//import UsuarioService from '../../services/Usuarios/UsuariosService';
import { useState } from 'react';
import {usuarios} from "../../utils/Usuarios";


import "./login.css";
import { useHistory } from "react-router";







const Login = () => {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

    const responseGoogle = (response) => {
      let usuarioCheck=  usuarios.find((u) => u.correo === response.profileObj.email);

      if(usuarioCheck)
      {
        console.log(response.profileObj.email);
        handleClick();
      }
      else{
        console.log("no encontro");   
      }
      }
    
//hola
return(<div>
<GoogleLogin
                clientId="610747110294-o2cruk32qs9j2mi3o9ob1b7dpu4ib35u.apps.googleusercontent.com"
                buttonText="Google"
                onSuccess={responseGoogle}

                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />

</div>);
}
"hola"
export default Login;

