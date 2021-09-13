import axios from "axios"
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;

export class GrupoService {

    getAll(){
        return axios.get( baseUrl + "grupos", {
          headers: {
            Authorization: `Bearer ${REACT_APP_API_KEY}`,
          },
        } ).then( res => res.data.data ).catch(error => error.response.data);
    } 

    getOne(id){
      return axios.get( baseUrl + "grupo/" + id, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then( res => res.data).catch(error => error.response.data);
    }

    get_grupo_marcas_nn(){
      return axios.get( baseUrl + "grupo_marcas_nn", {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      } ).then( res => res.data.data).catch(error => error.response.data);
    }

    get_grupo_marca_subgrupo(){
      return axios.get( baseUrl + "grupo_marca_subgrupo",{
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      } ).then( res => res.data.data).catch(error => error.response.data);
    }

    create(grupo){
      return axios.post( baseUrl + "grupo", grupo, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then( res => res.data).catch(error => error.response.data);
    }

    update(grupo){
      return axios.put( baseUrl + "grupo/" + grupo[0].id, grupo, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then( res => res.data).catch(error => error.response.data);
    }

    softDelete(grupo){
      return axios.put( baseUrl + "delete-grupo/"+ grupo.id, grupo, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then(res => res.data).catch(error => error.response.data);
  }

}