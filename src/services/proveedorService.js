import axios from "axios";
import {baseUrl} from "../utils/constantes";
export class ProveedorService {

   
    getAll(){
        return axios.get(baseUrl+"proveedores").then(res => res.data.data);
    }
    getOne(proveedor){
        return axios.get(baseUrl+"proveedor"+proveedor._id).then(res => res.data.data);
    }

    get_proveedores_marcas_nn(){
        return axios.get( baseUrl + "proveedores_marcas_nn" ).then( res => res.data.data );
      }

    create(proveedor){
        return axios.post(baseUrl+"proveedor/", proveedor).then(res => res.data);
    }

    update(proveedor){
        return axios.put(baseUrl+"proveedor/"+proveedor[0].id, proveedor).then(res => res.data).catch(error => error.response.data);
    }

    softDelete(proveedor){
        return axios.put(baseUrl+"delete-proveedor/"+proveedor.id, proveedor).then(res => res.data).catch(error => error.response.data);
    }
}