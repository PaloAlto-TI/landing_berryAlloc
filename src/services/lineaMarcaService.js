import axios from "axios"
import {baseUrl} from "../utils/constantes";

export class LineaMarcaService {

    getAll(){
        return axios.get( baseUrl + "linea-marca-vista" ).then( res => res.data.data );
    }

}