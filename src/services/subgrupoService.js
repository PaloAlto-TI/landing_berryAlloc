import axios from "axios";
import {baseUrl} from "../utils/constantes";
const { REACT_APP_API_KEY } = process.env;

export class SubgrupoService {

   
    getAll(){
        return axios.get(baseUrl+"subgrupos" , {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data.data);
    }
    getOne(subgrupo){
        return axios.get(baseUrl+"subgrupo"+subgrupo.id, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data.data);
    }

    get_subgrupo_marcas_nn(){
        return axios.get( baseUrl + "subgrupo_marcas_nn", {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          } ).then( res => res.data.data );
    }

    create(subgrupo){
        return axios.post(baseUrl+"subgrupo/", subgrupo, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data).catch(error => error.response.data);
    }

    update(subgrupo){
        return axios.put(baseUrl+"subgrupo/"+subgrupo.id, subgrupo, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data);
    }

    softDelete(subgrupo){
       // console.log("entra en delete "+JSON.stringify(subgrupo));
        return axios.put(baseUrl+"delete-subgrupo/"+subgrupo.id, subgrupo, {
            headers: {
              Authorization: `Bearer ${REACT_APP_API_KEY}`,
            },
          }).then(res => res.data);
    }
    
}