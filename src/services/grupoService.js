import axios from "axios"
import {baseUrl} from "../utils/constantes";

export class GrupoService {

    getAll(){
        return axios.get( baseUrl + "grupos" ).then( res => res.data.data );
    }

    getOne(id){
      return axios.get( baseUrl + "grupo/" + id).then( res => res.data);
    }

    create(grupo){
      return axios.post( baseUrl + "grupo", grupo).then( res => res.data);
    }

    update(grupo){
      return axios.put( baseUrl + "grupo/" + grupo.id, grupo).then( res => res.data)
    }

    softDelete(grupo){
      return axios.put( baseUrl + "delete-grupo/"+ grupo.id, grupo).then(res => res.data);
  }

}