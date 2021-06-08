import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class ExistenciaService {

    getExistencias(){
        return axios.get(baseUrl+"existencias").then(res => res.data.data);
    }

    getExistencia(existencia){
        return axios.get(baseUrl+"existencia/"+existencia._id).then(res => res.data.data);
    }

    createExistencia(existencia){
        return axios.post(baseUrl+"existencia/", existencia).then(res => res.data);
    }

    updateExistencia(existencia){
        return axios.put(baseUrl+"existencia/"+existencia._id, existencia).then(res => res.data);
    }

    softDeleteExistencia(existencia){
        return axios.put(baseUrl+"delete-existencia/"+existencia._id, existencia).then(res => res.data);
    }
    
}