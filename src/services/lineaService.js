import axios from "axios"
import {baseUrl} from "../utils/constantes";

export class LineaService {

    getAll(){
        return axios.get(baseUrl + "lineas").then(res => res.data)
    }



  /*  router.get('/lineas', lineaCTRL.getLineas);
router.get('/linea/:id', lineaCTRL.getLinea );
router.post('/linea', lineaCTRL.createLinea );
router.put('/linea/:id', lineaCTRL.updateLinea );
*/


}