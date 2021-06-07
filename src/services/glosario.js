import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class GlosarioService {

   

    create(glosario){
        return axios.post(baseUrl+"glosario/", glosario).then(res => res.data);
    }

    getAll(){
        return axios.get(baseUrl+"glosarios").then(res => res.data.data);
    }

    update(glosario){
        return axios.put(baseUrl+"glosario/"+glosario._id, glosario).then(res => res.data);
    }

    delete(glosario){
        return axios.put(baseUrl+"delete-glosario/"+glosario._id, glosario).then(res => res.data);
    }
    
}