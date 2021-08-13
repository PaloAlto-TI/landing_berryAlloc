import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class ExistenciaService {

    getAll(){
        return axios.get(baseUrl+"existencias").then(res => res.data);
    }

    getOne(existencia){
        return axios.get(baseUrl+"existencia/"+existencia._id).then(res => res.data.data);
    }

    create(existencia){
        return axios.post(baseUrl+"existencia/", existencia).then(res => res.data);
    }

    update(existencia){
        return axios.put(baseUrl+"existencia/"+existencia._id, existencia).then(res => res.data);
    }

    softDelete(existencia){
        return axios.put(baseUrl+"delete-existencia/"+existencia._id, existencia).then(res => res.data);
    }
    
}