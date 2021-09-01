import axios from "axios"
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;

// OBSERVACION 31/08/2021: SE DEBERÍA MANEJAR DE OTRA MANERA LOS LLAMADOS A LAS VISTAS EN LOS SERVICIOS YA SE PUEDEN LLEGAR A CONFUNDIR CON LOS MODELOS
// Ó MANEJAR CON OTRA FUNCIÓN DENTRO DE LAS CLASES

export class LineasMarcasService {

    getAll(){

        return axios.get( baseUrl + "linea-marcas" , {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then( res => res.data.data);

       // return axios.get( baseUrl + "linea-marcas" ).then( res => res.data.data );
    }
    getAllLineasmarcas(){

        return axios.get( baseUrl + "linea-marcas-all" , {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then( res => res.data.data);
        // return axios.get( baseUrl + "linea-marcas-all" ).then( res => res.data.data );
    }

}