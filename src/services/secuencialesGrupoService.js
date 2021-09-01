import axios from "axios"
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;
// OBSERVACIÓN: 31/08/2021 - SE DEBE DEFINIR UN DIRECTORIO PARA GUARDAR SOLO LAS VISTAS DE LA BASE DE DATOS CON EL OBJETIVO DE TENER UNA MEJOR ORGANIZACIÓN

export class SecuencialesGrupoService {

    getAll(){
        return axios.get( baseUrl + "secuenciales-codigo-grupo-02" , {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then( res => res.data.data);

        //return axios.get( baseUrl + "secuenciales-codigo-grupo-02" ).then( res => res.data.data );
    }
}