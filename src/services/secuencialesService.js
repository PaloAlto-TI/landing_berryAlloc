import axios from "axios"
import {baseUrl} from "../utils/constantes";

// OBSERVACIÓN: 16/08/2021 - SE DEBE DEFINIR UN DIRECTORIO PARA GUARDAR SOLO LAS VISTAS DE LA BASE DE DATOS CON EL OBJETIVO DE TENER UNA MEJOR ORGANIZACIÓN

export class SecuencialesService {

    getAll(){
        // console.log("ENTRA AL SERVIDE DE LA VISTA")
        return axios.get( baseUrl + "secuenciales-codigo-01" ).then( res => res.data.data );
    }
}