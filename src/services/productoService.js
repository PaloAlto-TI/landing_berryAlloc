import axios from "axios";
import {baseUrl} from "../utils/constantes";
let { REACT_APP_API_KEY, REACT_APP_CONTIFICO_KEY, REACT_APP_TEST } = process.env;
export class ProductoService {
    
    getAllProductos(){
        return axios.get(baseUrl+"vista-all", {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data.data);
    }
    
    getModelos(){
      return axios.get(baseUrl+"modelos", {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then(res => res.data.data);
    }


    getSerialModelo(id){
      return axios.get(baseUrl+"codigo-modelo/"+id, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      }).then(res => res.data.data);
    }

    getProductos(id){

        // REACT_APP_TEST = Math.floor((Math.random() * 3) + 1);
        // console.log("ENTORNO!!!!",REACT_APP_TEST);
        console.log("EL OBJETO", id);
        return axios.post(baseUrl+"vista", id, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data.data);
    }
    
    getProducto(producto){
        return axios.get(baseUrl+"producto/"+producto.id, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data.data);
    }

    createProducto(producto){
        return axios.post(baseUrl+"producto/", producto, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data).catch(error => error.response.data);
    }


    updateProducto(producto){
        return axios.put(baseUrl+"producto/"+producto.id, producto, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data).catch(error => error.response.data);;
    }

    softDeleteProducto(producto){
        return axios.put(baseUrl+"delete-producto/"+producto.id, producto, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data);
    }

    getStock(id){

      
        return axios.get("https://api.contifico.com/sistema/api/v1/producto/?codigo=" +id, {
            headers: { 
              Authorization: REACT_APP_CONTIFICO_KEY
            }
          }).then(res => res.data[0] ? res.data[0].cantidad_stock : "N/A");
    }
    
}