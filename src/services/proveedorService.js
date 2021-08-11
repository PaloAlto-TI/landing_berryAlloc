import axios from "axios";
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;
export class ProveedorService {

   
    getAll(){
        return axios.get(baseUrl+"proveedores", {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data.data);
    }
    getOne(proveedor){
        return axios.get(baseUrl+"proveedor"+proveedor._id, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data.data);
    }

    get_proveedores_marcas_nn(){
        return axios.get( baseUrl + "proveedores_marcas_nn" , {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then( res => res.data.data );
      }

    create(proveedor){
        return axios.post(baseUrl+"proveedor/", proveedor, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data);
    }

    update(proveedor){
        return axios.put(baseUrl+"proveedor/"+proveedor[0].id, proveedor, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data).catch(error => error.response.data);
    }

    softDelete(proveedor){
        return axios.put(baseUrl+"delete-proveedor/"+proveedor.id, proveedor, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then(res => res.data).catch(error => error.response.data);
    }
}