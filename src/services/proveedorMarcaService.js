import axios from "axios"
import {baseUrl} from "../utils/constantes";

export class ProveedorMarcaService {

    getAll(){
        return axios.get( baseUrl + "proveedor-marca-vista" ).then( res => res.data.data );
    }
}