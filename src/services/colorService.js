import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class ColorService {

   
    getAll(){
        return axios.get(baseUrl+"colores").then(res => res.data.data);
    }

    getOne(id){
        return axios.get(baseUrl+"color/"+id).then(res => res.data);
    }

    create(color){
        return axios.post(baseUrl+"color/", color).then(res => res.data).catch(error => error.response.data);
    }


    update(color){
        return axios.put(baseUrl+"color/"+color.id, color).then(res => res.data).catch(error => error.response.data);;
    }

    softDelete(color){
        return axios.put(baseUrl+"delete-color/"+color.id, color).then(res => res.data);
    }
    
}