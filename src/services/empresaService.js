import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class EmpresaService {


    getAll(){
        return axios.get(baseUrl+"empresas").then(res => res.data.data);
    }

    getOne(empresa){
        return axios.get(baseUrl+"empresa/"+empresa._id).then(res => res.data.data);
    }
    
    create(empresa){
        return axios.post(baseUrl+"empresa/", empresa).then(res => res.data);
    }

    update(empresa){
        return axios.put(baseUrl+"empresa/"+empresa._id, empresa).then(res => res.data);
    }

    softDelete(empresa){
        return axios.put(baseUrl+"delete-empresa/"+empresa._id, empresa).then(res => res.data);
    }
    
}