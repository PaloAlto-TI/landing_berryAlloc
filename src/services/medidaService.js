import axios from "axios"
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;
export class MedidaService {

    getAll(){
        return axios.get( baseUrl + "medidas" , {
          headers: {
            Authorization: `Bearer ${REACT_APP_API_KEY}`,
          },
        } ).then( res => res.data.data );
    }

    getOne(medida){
      return axios.get( baseUrl + "medida/" + medida._id, medida, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      } ).then( res => res.data);
    }

    create(medida){
      return axios.post( baseUrl + "medida", medida , {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      } ).then( res => res.data);
    }

    update(medida){
      return axios.put( baseUrl + "medida/" + medida._id, medida , {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      } ).then( res => res.data)
    }

    softDelete(medida){
      return axios.put( baseUrl + "delete-medida/"+ medida._id, medida, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      } ).then(res => res.data);
  }
}