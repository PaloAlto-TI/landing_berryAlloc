import axios from "axios";
import { baseUrl } from "../../../../utils/constantes";
let { REACT_APP_API_KEY } = process.env;

export function getAllSubgrupos(){
    return axios.get(baseUrl+"subgrupos-appsheet", {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      });
}

export function getGruposLineaBySubgrupo(id){

    return axios.get(baseUrl+"grupos-appsheet/" + id, {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      });
}

