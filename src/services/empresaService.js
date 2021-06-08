import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class EmpresaService {


    getEmpresas(){
        return axios.get(baseUrl+"empresas").then(res => res.data.data);
    }

    getEmpresa(empresa){
        return axios.get(baseUrl+"empresa/"+empresa._id).then(res => res.data.data);
    }
    
    createEmpresa(empresa){
        return axios.post(baseUrl+"empresa/", empresa).then(res => res.data);
    }

    updateEmpresa(empresa){
        return axios.put(baseUrl+"empresa/"+empresa._id, empresa).then(res => res.data);
    }

    softDeleteEmpresa(empresa){
        return axios.put(baseUrl+"delete-empresa/"+empresa._id, empresa).then(res => res.data);
    }
    
}