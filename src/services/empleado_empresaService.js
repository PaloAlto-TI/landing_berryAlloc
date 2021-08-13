import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class Empleado_EmpresaService {

   

   

    getAll(){
        return axios.get(baseUrl+"empleado_empresas").then(res => res.data);
    }

    getOne(empleado_empresa){
        return axios.get(baseUrl+"empleado_empresa/"+empleado_empresa._id).then(res => res.data);
    }

    create(empleado_empresa){
        return axios.post(baseUrl+"empleado_empresa/", empleado_empresa).then(res => res.data);
    }

    update(empleado_empresa){
        return axios.put(baseUrl+"empleado_empresa/"+empleado_empresa._id, empleado_empresa).then(res => res.data);
    }

    softDelete(empleado_empresa){
        return axios.put(baseUrl+"delete-empleado_empresa/"+empleado_empresa._id, empleado_empresa).then(res => res.data);
    }
    
}