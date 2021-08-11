import axios from "axios";
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;

export class ColorService {

   
    getAll(){
        return axios.get(baseUrl+"colores", {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data.data);
    }

    getOne(id){
        return axios.get(baseUrl+"color/"+id, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data);
    }

    create(color){
        return axios.post(baseUrl+"color/", color, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data).catch(error => error.response.data);
    }


    update(color){
        return axios.put(baseUrl+"color/"+color.id, color, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data).catch(error => error.response.data);;
    }

    softDelete(color){
        return axios.put(baseUrl+"delete-color/"+color.id, color, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data);
    }
    
}