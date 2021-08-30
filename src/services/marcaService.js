import axios from "axios"
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;

export class MarcaService {

    getAll(){
      return axios.get( baseUrl + "marcas", {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      } ).then( res => res.data.data );
    }

    getOne(id){
      return axios.get( baseUrl + "marca/" + id, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then( res => res.data);
    }

    get_marcas_lineas_nn(){
      return axios.get( baseUrl + "marcas_lineas_nn", {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      } ).then( res => res.data.data );
    }

    create(marca){
      return axios.post( baseUrl + "marca", marca, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then( res => res.data).catch(error => error.response.data);
    }

    update(marca){
      return axios.put( baseUrl + "marca/" + marca[0].id, marca, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then( res => res.data).catch(error => error.response.data);
    }

    softDelete(marca){
      return axios.put( baseUrl + "delete-marca/"+ marca.id, marca, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then(res => res.data).catch(error => error.response.data);
    }
}