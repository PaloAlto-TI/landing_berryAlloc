import axios from "axios"
import {baseUrl} from "../utils/constantes";

export class GrupoService {

    getAll(){
        return axios.get( baseUrl + "grupos" ).then( res => res.data.data ).catch(error => error.response.data);
    } 

    getOne(id){
      return axios.get( baseUrl + "grupo/" + id).then( res => res.data).catch(error => error.response.data);
    }

    get_grupo_marcas_nn(){
      return axios.get( baseUrl + "grupo_marcas_nn" ).then( res => res.data.data).catch(error => error.response.data);
    }

    get_grupo_marca_subgrupo(){
      return axios.get( baseUrl + "grupo_marca_subgrupo" ).then( res => res.data.data).catch(error => error.response.data);
    }

    create(grupo){
      return axios.post( baseUrl + "grupo", grupo).then( res => res.data).catch(error => error.response.data);
    }

    update(grupo){
      return axios.put( baseUrl + "grupo/" + grupo[0].id, grupo).then( res => res.data).catch(error => error.response.data);
    }

    softDelete(grupo){
      return axios.put( baseUrl + "delete-grupo/"+ grupo.id, grupo).then(res => res.data).catch(error => error.response.data);
  }

}