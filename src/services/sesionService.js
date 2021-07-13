import axios from "axios";
import {baseUrl} from "/Users/Jonnathan/Documents/PALO ALTO PROJECTS/PRODUCTOS/PRODUCTOS_PA_FE/src/utils/constantes";
export class SesionService {

    
   
    getAll(){
       
        return axios.get(baseUrl+"sesiones").then(res => res.data);
    }

    getOne(id){
        return axios.get(baseUrl+"sesion/"+id).then(res => res.data);
    }

    create(sesion){
        return axios.post(baseUrl+"sesion/", sesion).then(res => res.data).catch(error => error.response.data);
    }


    update(sesion){
        return axios.put(baseUrl+"sesion/"+sesion.id, sesion).then(res => res.data).catch(error => error.response.data);;
    }

    softDelete(sesion){
        return axios.put(baseUrl+"delete-sesion/"+sesion.id, sesion).then(res => res.data);
    }
    
}