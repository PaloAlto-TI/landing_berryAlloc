import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class GrupoService {

   

   
    getGrupos(){
        return axios.get(baseUrl+"grupos").then(res => res.data.data);
    }

    getGrupo(grupo){
        return axios.get(baseUrl+"grupo/"+grupo._id).then(res => res.data.data);
    }

    createGrupo(grupo){
        return axios.post(baseUrl+"grupo/", grupo).then(res => res.data);
    }

    update(grupo){
        return axios.put(baseUrl+"grupo/"+grupo._id, grupo).then(res => res.data);
    }

    delete(grupo){
        return axios.put(baseUrl+"delete-grupo/"+grupo._id, grupo).then(res => res.data);
    }
    
}