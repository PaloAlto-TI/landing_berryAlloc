import axios from "axios";
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;
export class ProductoTipoService {

   
    getAll(){
        return axios.get(baseUrl+"producto-tipos", {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data.data);
    }
    
    getOne(id){
        return axios.get(baseUrl+"producto-tipo/"+id, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data);
    }

}