import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class ProductoService {

    getProductos(){
        return axios.get(baseUrl+"productos").then(res => res.data.data);
    }
    getProducto(producto){
        return axios.get(baseUrl+"producto"+producto._id).then(res => res.data.data);
    }

    createProducto(producto){
        return axios.post(baseUrl+"producto/", producto).then(res => res.data);
    }


    updateProducot(producto){
        return axios.put(baseUrl+"producto/"+producto._id, producto).then(res => res.data);
    }

    softDeleteProducto(producto){
        return axios.put(baseUrl+"delete-producto/"+producto._id, producto).then(res => res.data);
    }
    
}