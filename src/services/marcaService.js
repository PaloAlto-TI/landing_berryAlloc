import axios from "axios"
import {baseUrl} from "../utils/constantes";

export class MarcaService {

    getAll(){
      return axios.get( baseUrl + "marcas" ).then( res => res.data.data );
    }

    getOne(id){
      return axios.get( baseUrl + "marca/" + id).then( res => res.data);
    }

    get_marcas_lineas_nn(){
      return axios.get( baseUrl + "marcas_lineas_nn" ).then( res => res.data.data );
    }

    create(marca){
      return axios.post( baseUrl + "marca", marca).then( res => res.data).catch(error => error.response.data);
    }

    update(marca){
      return axios.put( baseUrl + "marca/" + marca[0].id, marca).then( res => res.data).catch(error => error.response.data);
    }

    softDelete(marca){
      return axios.put( baseUrl + "delete-marca/"+ marca.id, marca).then(res => res.data).catch(error => error.response.data);
    }
}