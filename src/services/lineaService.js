import axios from "axios"
import {baseUrl} from "../utils/constantes";

export class LineaService {

    getAll(){
        return axios.get( baseUrl + "lineas" ).then( res => res.data.data);
    }

    getOne(id){
      return axios.get( baseUrl + "linea/" + id).then( res => res.data);
    }

    get_marcas_lineas_nn(){
      return axios.get( baseUrl + "marcas_lineas_nn" ).then( res => res.data.data );
    }

    create(linea){
      return axios.post( baseUrl + "linea", linea).then( res => res.data).catch(error => error.response.data);
    }

    update(linea){
      return axios.put( baseUrl + "linea/" + linea.id, linea).then( res => res.data).catch(error => error.response.data);
    }

    softDelete(linea){
      return axios.put( baseUrl + "delete-linea/"+ linea.id, linea).then(res => res.data).catch(error => error.response.data);
    }
}