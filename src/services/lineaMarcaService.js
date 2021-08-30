import axios from "axios"
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;
export class LineaMarcaService {

    getAll(){
        return axios.get( baseUrl + "linea-marca-vista", {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }  ).then( res => res.data.data );
    }
}