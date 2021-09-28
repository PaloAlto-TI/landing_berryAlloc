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
export function getAllLineas(){
  return axios.get(baseUrl+"lineas-orden", {
      headers: {
        Authorization: `Bearer ${REACT_APP_API_KEY}`,
      },
    });
}
export function getAllGrupos(){
  return axios.get(baseUrl+"grupos", {
      headers: {
        Authorization: `Bearer ${REACT_APP_API_KEY}`,
      },
    });
}

export function getAllMarcas(){
  return axios.get(baseUrl+"linea-marca-vista-helper", {
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
export function getLineasStock(){

    return axios.get(baseUrl+"lineas-stocks", {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      });
}

