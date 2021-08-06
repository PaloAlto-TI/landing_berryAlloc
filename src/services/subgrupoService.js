import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class SubgrupoService {

   
    getAll(){
        return axios.get(baseUrl+"subgrupos").then(res => res.data.data);
    }
    getOne(subgrupo){
        return axios.get(baseUrl+"subgrupo"+subgrupo.id).then(res => res.data.data);
    }

    create(subgrupo){
        return axios.post(baseUrl+"subgrupo/", subgrupo).then(res => res.data);
    }


    update(subgrupo){
        return axios.put(baseUrl+"subgrupo/"+subgrupo.id, subgrupo).then(res => res.data);
    }

    softDelete(subgrupo){
       // console.log("entra en delete "+JSON.stringify(subgrupo));
        return axios.put(baseUrl+"delete-subgrupo/"+subgrupo.id, subgrupo).then(res => res.data);
    }
    
}