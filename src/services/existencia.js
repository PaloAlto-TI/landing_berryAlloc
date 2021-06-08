import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class ExistenciaService {

   

    create(existencia){
        return axios.post(baseUrl+"existencia/", existencia).then(res => res.data);
    }

    getAll(){
        return axios.get(baseUrl+"existencias").then(res => res.data.data);
    }

    update(existencia){
        return axios.put(baseUrl+"existencia/"+existencia._id, existencia).then(res => res.data);
    }

    delete(existencia){
        return axios.put(baseUrl+"delete-existencia/"+existencia._id, existencia).then(res => res.data);
    }
    
}