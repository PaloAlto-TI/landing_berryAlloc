import axios from "axios"
import {baseUrl} from "../utils/constantes";

export class MedidaService {

    getAll(){
        return axios.get( baseUrl + "medidas" ).then( res => res.data.data );
    }

    getOne(medida){
      return axios.get( baseUrl + "medida/" + medida._id, medida).then( res => res.data);
    }

    create(medida){
      return axios.post( baseUrl + "medida", medida).then( res => res.data);
    }

    update(medida){
      return axios.put( baseUrl + "medida/" + medida._id, medida).then( res => res.data)
    }

    softDelete(medida){
      return axios.put( baseUrl + "delete-medida/"+ medida._id, medida).then(res => res.data);
  }
}