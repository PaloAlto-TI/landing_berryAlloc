import axios from "axios"
import {baseUrl} from "../utils/constantes";

export class GrupoMarcaService {

    getAll(){
        return axios.get( baseUrl + "grupo-marca-vista" ).then( res => res.data.data );
    }
}