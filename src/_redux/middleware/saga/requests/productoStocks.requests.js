import axios from "axios";
import { baseUrl } from "../../../../utils/constantes";
let { REACT_APP_API_KEY } = process.env;

export function getAllSubgrupos() {
  return axios.get(baseUrl + "subgrupos-appsheet", {
    headers: {
      Authorization: `Bearer ${REACT_APP_API_KEY}`,
    },
  });
}

export function getMarcasByLinea(id) {

  return axios.get(baseUrl + "marcas-appsheet/" + id, {
    headers: {
      Authorization: `Bearer ${REACT_APP_API_KEY}`,
    },
  });
}

export function getGruposByLineaMarca(id) {

  return axios.get(baseUrl + "grupos_lineamarca-appsheet/"+id, {
    headers: {
      Authorization: `Bearer ${REACT_APP_API_KEY}`,
    },
  });
}

/*export function getLineasStock(){

    return axios.get(baseUrl+"lineas-stocks", {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      });
}*/

// CREADO POR MANUEL CORONEL

export function getAllLineas() {

  return axios.get(baseUrl + "lineas-appsheet", {
    headers: {
      Authorization: `Bearer ${REACT_APP_API_KEY}`,
    },
  });
}

