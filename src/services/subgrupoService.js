import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class SubgrupoService {

   
    getSubgrupos(){
        return axios.get(baseUrl+"subgrupos").then(res => res.data.data);
    }
    getSubgrupo(subgrupo){
        return axios.get(baseUrl+"subgrupo"+subgrupo._id).then(res => res.data.data);
    }

    createSubgrupo(subgrupo){
        return axios.post(baseUrl+"subgrupo/", subgrupo).then(res => res.data);
    }


    updateSubgrupo(subgrupo){
        return axios.put(baseUrl+"subgrupo/"+subgrupo._id, subgrupo).then(res => res.data);
    }

    softDeleteSubgrupo(subgrupo){
        return axios.put(baseUrl+"delete-subgrupo/"+subgrupo._id, subgrupo).then(res => res.data);
    }
    
}