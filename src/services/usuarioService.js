import axios from "axios";
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;

export class UsuarioService {

   
    getAll(){
       
        return axios.get(baseUrl+"usuarios", {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data);
    }

    getOne(id){
        return axios.get(baseUrl+"usuario/"+id, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data);
    }

    create(usuario){
        return axios.post(baseUrl+"usuario/", usuario, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data).catch(error => error.response.data);
    }


    update(usuario){
        return axios.put(baseUrl+"usuario/"+usuario.id, usuario, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res).catch(error => error.response.data);;
    }

    softDelete(usuario){
        return axios.put(baseUrl+"delete-usuario/"+usuario.id, usuario, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data);
    }
    
}