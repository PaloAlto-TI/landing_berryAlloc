import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class GrupoService {

   

    create(grupo){
        return axios.post(baseUrl+"grupo/", grupo).then(res => res.data);
    }

    getAll(){
        return axios.get(baseUrl+"empresas").then(res => res.data.data);
    }

    update(grupo){
        return axios.put(baseUrl+"grupo/"+grupo._id, grupo).then(res => res.data);
    }

    delete(grupo){
        return axios.put(baseUrl+"delete-grupo/"+grupo._id, grupo).then(res => res.data);
    }
    
}