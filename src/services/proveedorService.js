import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class ProveedorService {

   
    getProveedores(){
        return axios.get(baseUrl+"proveedores").then(res => res.data.data);
    }
    getProveedor(proveedor){
        return axios.get(baseUrl+"proveedor"+proveedor._id).then(res => res.data.data);
    }

    createProveedor(proveedor){
        return axios.post(baseUrl+"proveedor/", proveedor).then(res => res.data);
    }


    updateProveedor(proveedor){
        return axios.put(baseUrl+"proveedor/"+proveedor._id, proveedor).then(res => res.data);
    }

    softDeleteProveedor(proveedor){
        return axios.put(baseUrl+"delete-proveedor/"+proveedor._id, proveedor).then(res => res.data);
    }
    
}