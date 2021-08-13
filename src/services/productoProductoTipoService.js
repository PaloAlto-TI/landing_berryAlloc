import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class ProductoProductoTipoService {

   
    getSecuencias(){
        return axios.get(baseUrl+"secuencias-producto-tipos").then(res => res.data.data);
    }

    getSecuencia(id){
        return axios.get(baseUrl+"secuencia-producto-tipo/"+id).then(res => res.data.data);
    }
    

}