import axios from "axios"
import {baseUrl} from "../utils/constantes";

export class LineaService {

    getLineas(){
        return axios.get( baseUrl + "lineas" ).then( res => res.data );
    }

    getLinea(linea){
      return axios.get( baseUrl + "linea/" + linea._id, linea).then( res => res.data.data);
    }

    createLinea(linea){
      return axios.post( baseUrl + "linea", linea).then( res => res.data);
    }

    updateLinea(linea){
      return axios.put( baseUrl + "linea/" + linea._id, linea).then( res => res.data)
    }

    softDeleteLinea(linea){
      return axios.put( baseUrl + "delete-linea/"+ linea._id, linea).then(res => res.data);
  }
}