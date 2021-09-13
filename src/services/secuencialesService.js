import axios from "axios"
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;
// OBSERVACIÓN: 16/08/2021 - SE DEBE DEFINIR UN DIRECTORIO PARA GUARDAR SOLO LAS VISTAS DE LA BASE DE DATOS CON EL OBJETIVO DE TENER UNA MEJOR ORGANIZACIÓN

export class SecuencialesService {

    getAll(){
        // console.log("ENTRA AL SERVIDE DE LA VISTA")
        return axios.get( baseUrl + "secuenciales-codigo-01" , {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then( res => res.data.data);
        //return axios.get( baseUrl + "secuenciales-codigo-01" ).then( res => res.data.data );
    }

    getOne(typeTransactionData){
        // console.log("ENTRA AL GET ONE DE LA VISTA CON: ", {typeTransactionData})
        // delete typeTransactionData.tableNamePSQL;
        // OBSERVACIÓN: 08/09/2021 - SE PUDIERA RETORNAR CON res.data.data PERO SE DEBE ANALIZAR SI SE MANDA CON ESTRUCTURA INCLUIDO EL ATRIBUTO: message PARA UN MAYOR CONTROL 
        // OBSERVACIÓN: 09/09/2021 - SE MANDA EL typeTransactionData DENTRO DE UN JSON POR SI ACASO EN UN FUTURO SE NECESITEN OTRAS INSTANCIAS DENTRO DEL MISMO
        // {
       
        // }
        
        return axios.post( baseUrl + "secuenciales-codigo-01",{typeTransactionData} ,{   headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`
          
        } } ).then( res => res.data);

      }

}