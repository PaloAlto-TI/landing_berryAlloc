import axios from "axios";
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;

export class SesionService {

    
   
    getAll(){
       
        return axios.get(baseUrl+"sesiones" , {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data);
    }

    getOne(id){
        return axios.get(baseUrl+"sesion/"+id, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data);
    }

    create(sesion){
        return axios.post(baseUrl+"sesion/", sesion, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data).catch(error => error.response.data);
        
    }

    getUsuario(sesion){
        //console.log("token sesion: "+sesion.token);

        return axios.post(baseUrl+"sesionusuario/", sesion , {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data).catch(error => error.response.data);
    }


    update(sesion){
        return axios.put(baseUrl+"sesion/"+sesion.id, sesion, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data).catch(error => error.response.data);;
    }

    softDelete(sesion){
        console.log("sesion Service:"+JSON.stringify(sesion._id));
        return axios.put(baseUrl+"delete-sesion/"+sesion._id, sesion, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data);
    }
    
}