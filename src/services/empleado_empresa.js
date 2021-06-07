import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class Empleado_EmpresaService {

   

   

    getEmpleado_Empresas(){
        return axios.get(baseUrl+"empleado_empresas").then(res => res.data.data);
    }

    getEmpleado_Empresa(empleado_empresa){
        return axios.get(baseUrl+"empleado_empresa/"+empleado_empresa._id).then(res => res.data.data);
    }

    createEmpleado_Empresa(empleado_empresa){
        return axios.post(baseUrl+"empleado_empresa/", empleado_empresa).then(res => res.data);
    }

    updateEmpleado_Empresa(empleado_empresa){
        return axios.put(baseUrl+"empleado_empresa/"+empleado_empresa._id, empleado_empresa).then(res => res.data);
    }

    softDeleteEmpleado_Empresa(empleado_empresa){
        return axios.put(baseUrl+"delete-empleado_empresa/"+empleado_empresa._id, empleado_empresa).then(res => res.data);
    }
    
}