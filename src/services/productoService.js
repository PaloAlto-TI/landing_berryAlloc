import axios from "axios";
export class ProductoService {

    baseUrl = "http://localhost:5050/productos/";

    create(producto){
        return axios.post(this.baseUrl+"producto/", producto).then(res => res.data);
    }

    getAll(){
        return axios.get(this.baseUrl).then(res => res.data.data);
    }

    update(producto){
        return axios.put(this.baseUrl+"producto/"+producto._id, producto).then(res => res.data);
    }

    
}