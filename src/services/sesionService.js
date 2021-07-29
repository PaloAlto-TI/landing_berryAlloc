import axios from "axios";
//import {baseUrl} from "/Users/Jonnathan/Documents/PALO ALTO PROJECTS/PRODUCTOS/PRODUCTOS_PA_FE/src/utils/constantes";
import {baseUrl} from "../utils/constantes";
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

    getUsuario(sesion){
        //console.log("token sesion: "+sesion.token);

        return axios.post(baseUrl+"sesionusuario", sesion).then(res => res.data).catch(error => error.response.data);
    }


    update(sesion){
        return axios.put(baseUrl+"sesion/"+sesion.id, sesion).then(res => res.data).catch(error => error.response.data);;
    }

    softDelete(sesion){
        console.log("sesion Service:"+JSON.stringify(sesion._id));
        return axios.put(baseUrl+"delete-sesion/"+sesion._id, sesion).then(res => res.data);
    }
    
}