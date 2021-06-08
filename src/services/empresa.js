import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class EmpresaService {

   

    create(empresa){
        return axios.post(baseUrl+"empresa/", empresa).then(res => res.data);
    }

    getAll(){
        return axios.get(baseUrl+"empresas").then(res => res.data.data);
    }

    update(empresa){
        return axios.put(baseUrl+"empresa/"+empresa._id, empresa).then(res => res.data);
    }

    delete(empresa){
        return axios.put(baseUrl+"delete-empresa/"+empresa._id, empresa).then(res => res.data);
    }
    
}