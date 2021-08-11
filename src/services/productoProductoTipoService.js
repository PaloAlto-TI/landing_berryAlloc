import axios from "axios";
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;
export class ProductoProductoTipoService {

   
    getSecuencias(){
        return axios.get(baseUrl+"secuencias-producto-tipos", {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data.data);
    }

    getSecuencia(id){
        return axios.get(baseUrl+"secuencia-producto-tipo/"+id, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data.data);
    }
    

}