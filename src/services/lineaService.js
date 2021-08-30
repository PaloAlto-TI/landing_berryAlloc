import axios from "axios"
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;

export class LineaService {

    getAll(){
        return axios.get( baseUrl + "lineas" , {
          headers: {
            Authorization: `Bearer ${REACT_APP_API_KEY}`,
          },
        }).then( res => res.data.data);
    }

    getOne(id){
      return axios.get( baseUrl + "linea/" + id, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then( res => res.data);
    }

    get_lineas_marcas_nn(){
      return axios.get( baseUrl + "lineas_marcas_nn", {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      } ).then( res => res.data.data );
    }

    create(linea){
      return axios.post( baseUrl + "linea", linea, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then( res => res.data).catch(error => error.response.data);
    }

    update(linea){
      return axios.put( baseUrl + "linea/" + linea[0].id, linea, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then( res => res.data).catch(error => error.response.data);
    }

    softDelete(linea){
      return axios.put( baseUrl + "delete-linea/"+ linea.id, linea, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then(res => res.data).catch(error => error.response.data);
    }
}