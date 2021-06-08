import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class GlosarioService {

   


    getGlosarios(){
        return axios.get(baseUrl+"glosarios").then(res => res.data.data);
    }

    getGlosario(glosario){
        return axios.get(baseUrl+"glosario/"+glosario._id).then(res => res.data.data);
    }

    createGlosario(glosario){
        return axios.post(baseUrl+"glosario/", glosario).then(res => res.data);
    }
    
    updateGlosario(glosario){
        return axios.put(baseUrl+"glosario/"+glosario._id, glosario).then(res => res.data);
    }

    softDeleteGlosario(glosario){
        return axios.put(baseUrl+"delete-glosario/"+glosario._id, glosario).then(res => res.data);
    }
    
}