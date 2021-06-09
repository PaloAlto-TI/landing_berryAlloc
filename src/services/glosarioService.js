import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class GlosarioService {

   


    getAll(){
        return axios.get(baseUrl+"glosarios").then(res => res.data.data);
    }

    getOne(glosario){
        return axios.get(baseUrl+"glosario/"+glosario._id).then(res => res.data.data);
    }

    create(glosario){
        return axios.post(baseUrl+"glosario/", glosario).then(res => res.data);
    }
    
    update(glosario){
        return axios.put(baseUrl+"glosario/"+glosario._id, glosario).then(res => res.data);
    }

    softDelete(glosario){
        return axios.put(baseUrl+"delete-glosario/"+glosario._id, glosario).then(res => res.data);
    }
    
}