import axios from "axios"
import {baseUrl} from "../utils/constantes";

export class LineaService {

    getAll(){
        return axios.get( baseUrl + "lineas" ).then( res => res.data.data );
    }

    getOne(linea){
      return axios.get( baseUrl + "linea/" + linea._id, linea).then( res => res.data);
    }

    create(linea){
      return axios.post( baseUrl + "linea", linea).then( res => res.data);
    }

    update(linea){
      return axios.put( baseUrl + "linea/" + linea._id, linea).then( res => res.data)
    }

    softDelete(linea){
      return axios.put( baseUrl + "delete-linea/"+ linea._id, linea).then(res => res.data);
  }
}