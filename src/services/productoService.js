import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class ProductoService {

   

    create(producto){
        return axios.post(baseUrl+"producto/", producto).then(res => res.data);
    }

    getAll(){
        return axios.get(baseUrl+"productos").then(res => res.data.data);
    }

    update(producto){
        return axios.put(baseUrl+"producto/"+producto._id, producto).then(res => res.data);
    }

    delete(producto){
        return axios.put(baseUrl+"delete-producto/"+producto._id, producto).then(res => res.data);
    }
    
}