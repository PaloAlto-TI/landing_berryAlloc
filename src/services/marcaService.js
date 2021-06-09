import axios from "axios"
import {baseUrl} from "../utils/constantes";

export class MarcaService {

    getAll(){
        return axios.get( baseUrl + "marcas" ).then( res => res.data.data );
    }

    getOne(marca){
      return axios.get( baseUrl + "marca/" + marca._id, marca).then( res => res.data);
    }

    create(marca){
      return axios.post( baseUrl + "marca", marca).then( res => res.data);
    }

    update(marca){
      return axios.put( baseUrl + "marca/" + marca._id, marca).then( res => res.data)
    }

    softDelete(marca){
      return axios.put( baseUrl + "delete-marca/"+ marca._id, marca).then(res => res.data);
  }
}