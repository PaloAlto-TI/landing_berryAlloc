//import UsuarioService from '../../services/Usuarios/UsuariosService';
// import { useState } from 'react';
import ReactPlayer from 'react-player/youtube'
import "./landing.css";
import { useHistory } from "react-router";

import logo from "./recursos/3Recurso 5.png";

//import imagen from "./img/img1.gif";



const Landing = () => {
    let history = useHistory();

    //kxjbcvklcx lvbdcx
    return (
        < >
            <div className="header1" >
            <img className="logo" src={logo} />
            <hr class="divider"></hr>
            </div>
            
            <div className="body1" >
        
                <p className="contenedortitle"> <span className="tittle0">floors for</span> <span className="tittle0">moments</span>  <span className="tittle0">to joy.</span> </p>
        

               {/* <a className="title1">vive la</a>
               <a className="title2"> experiencia </a>
               <a className="title3">  BERRYALLOC <br/></a> */}
               
            </div>

            <iframe clasname="iframevideo" src="https://drive.google.com/file/d/1F2jGc8lW0DT-dF3UgQ__KJNdXiad5Qjy/preview" width="100%" height="450px" allow="autoplay"></iframe>
            <ReactPlayer url='https://drive.google.com/file/d/1F2jGc8lW0DT-dF3UgQ__KJNdXiad5Qjy/preview' />

        </>
    );
}

export default Landing;

