import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class ProductoTipoService {

   
    getAll(){
        return axios.get(baseUrl+"producto-tipos").then(res => res.data.data);
    }
    
    getOne(id){
        return axios.get(baseUrl+"producto-tipo/"+id).then(res => res.data);
    }

}