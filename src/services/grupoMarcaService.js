import axios from "axios"
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;

export class GrupoMarcaService {

    getAll(){
        return axios.get( baseUrl + "grupo-marca-vista" , {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }  ).then( res => res.data.data );
    }
}