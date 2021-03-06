import axios from "axios";
import {baseUrl} from "../../../src/utils/constantes";
export class UsuarioService {

   
    getAll(){
        console.log(baseUrl+"usuarios");
        return axios.get(baseUrl+"usuarios").then(res => res.data.data);
    }

    getOne(id){
        return axios.get(baseUrl+"usuario/"+id).then(res => res.data);
    }

    create(usuario){
        return axios.post(baseUrl+"usuario/", usuario).then(res => res.data).catch(error => error.response.data);
    }


    update(usuario){
        return axios.put(baseUrl+"usuario/"+usuario.id, usuario).then(res => res.data).catch(error => error.response.data);;
    }

    softDelete(usuario){
        return axios.put(baseUrl+"delete-usuario/"+usuario.id, usuario).then(res => res.data);
    }
    
}