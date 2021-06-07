import axios from "axios";
export class Empleado_EmpresaService {

    baseUrl = "http://localhost:5050/empleado-empresa";

    create(empleado_empresa){
        return axios.post(this.baseUrl+"/empleado-empresa/", empleado_empresa).then(res => res.data);
    }

    getAll(){
        return axios.get(this.baseUrl+"s/").then(res => res.data.data);
    }

    update(empleado_empresa){
        return axios.put(this.baseUrl+"/empleado-empresa/"+producto._id, empleado_empresa).then(res => res.data);
    }

    delete(empleado_empresa){
        return axios.put(this.baseUrl+"/delete-empleado-empresa/"+producto._id, empleado_empresa).then(res => res.data);
    }
    
}