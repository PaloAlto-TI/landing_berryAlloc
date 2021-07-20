import axios from "axios"
import {baseUrl} from "../utils/constantes";

export class ColorGrupoService {

    getAll(){
        return axios.get( baseUrl + "color-grupo-vista" ).then( res => res.data.data );
    }
}