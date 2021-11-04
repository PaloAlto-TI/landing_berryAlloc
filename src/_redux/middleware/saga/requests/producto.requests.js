import axios from "axios";
import { baseUrl } from "../../../../utils/constantes";
let { REACT_APP_API_KEY } = process.env;

export function getAllProductos(){
    return axios.get(baseUrl+"vista-all", {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        },
      });
}

export function getProducto(id){
  return axios.get(baseUrl+"vista/"+ id, {
    headers: {
      Authorization: `Bearer ${REACT_APP_API_KEY}`,
    },
  })
}
// view-productos-by-estado

export function getProductosByEstado(estado){
  console.log("el estado dentor de request: ", estado)
  return axios.get(baseUrl+"view-productos-by-estado/"+ estado, {
      headers: {
        Authorization: `Bearer ${REACT_APP_API_KEY}`,
      },
    })
}


export function getProductosByLinea(id){
  console.log("el id", id)
  return axios.post(baseUrl+"vista", id, {
      headers: {
        Authorization: `Bearer ${REACT_APP_API_KEY}`,
      },
    })
}

export function getProductosByGrupo(id){
  console.log("el id", id)
  return axios.post(baseUrl+"productos-grupo", id, {
      headers: {
        Authorization: `Bearer ${REACT_APP_API_KEY}`,
      },
    })
}

export function createProducto(producto){
  console.log("producto crear: ",producto)
  return axios.post(baseUrl+"producto/", producto, {
      headers: {
        Authorization: `Bearer ${REACT_APP_API_KEY}`,
      },
    });
}

export function updateProducto(producto){
  return axios.put(baseUrl+"producto/"+producto.id, producto, {
      headers: {
        Authorization: `Bearer ${REACT_APP_API_KEY}`,
      },
    })
}

export function softDeleteProducto(producto){
  return axios.put(baseUrl+"delete-producto/"+producto.id, producto, {
      headers: {
        Authorization: `Bearer ${REACT_APP_API_KEY}`,
      },
    })
}

export function getSerialModelo(id){

  console.log("QUERY", id)
  console.log("la ruta", baseUrl+"codigo-modelo/"+id)
  return axios.get(baseUrl+"codigo-modelo/"+id, {
    headers: {
      Authorization: `Bearer ${REACT_APP_API_KEY}`,
    },
  })
}