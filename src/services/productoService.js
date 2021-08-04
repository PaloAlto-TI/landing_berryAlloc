import axios from "axios";
import { useState } from "react";
import {baseUrl} from "../utils/constantes";
export class ProductoService {

   
    getAllProductos(){
        return axios.get(baseUrl+"vista-all").then(res => res.data.data);
    }

    getProductos(id){
        console.log("EL OBJETO", id);
        return axios.post(baseUrl+"vista", id).then(res => res.data.data);
    }
    
    getProducto(producto){
        return axios.get(baseUrl+"producto/"+producto.id).then(res => res.data.data);
    }

    createProducto(producto){
        return axios.post(baseUrl+"producto/", producto).then(res => res.data).catch(error => error.response.data);
    }


    updateProducto(producto){
        return axios.put(baseUrl+"producto/"+producto.id, producto).then(res => res.data).catch(error => error.response.data);;
    }

    softDeleteProducto(producto){
        return axios.put(baseUrl+"delete-producto/"+producto.id, producto).then(res => res.data);
    }

    getStock(id){
        return axios.get("https://api.contifico.com/sistema/api/v1/producto/?codigo=" +id, {
            headers: { 
              'Authorization': 'ciyHIwfTzH2dUrKrlIzArbpbTKw7UmR2dclnHA1fllY'
            }
          }).then(res => res.data[0].cantidad_stock);
    }
    
}