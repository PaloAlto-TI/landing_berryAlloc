import axios from "axios"
import {baseUrl} from "../utils/constantes";

// OBSERVACION 31/08/2021: SE DEBERÍA MANEJAR DE OTRA MANERA LOS LLAMADOS A LAS VISTAS EN LOS SERVICIOS YA SE PUEDEN LLEGAR A CONFUNDIR CON LOS MODELOS
// Ó MANEJAR CON OTRA FUNCIÓN DENTRO DE LAS CLASES

export class LineasMarcasService {

    getAll(){
        return axios.get( baseUrl + "linea-marcas" ).then( res => res.data.data );
    }

}