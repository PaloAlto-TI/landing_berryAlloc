import { takeLatest } from "redux-saga/effects";
import { GET_GRUPOS,GET_MARCAS,GET_SUBGRUPOS, GET_GRUPOS_LINEA_BY_SUBGRUPO, GET_LINEAS } from "../../../ducks/stocks.duck";
import { handleGetAlltGrupos,handleGetAllLineas,handleGetAllMarcas,handleGetSubgrupos, handleGetGruposLineaBySubgrupo } from "../handlers/stocks.handlers";

export function* saga() {
  console.log("ENTRA A LA SAGA DE STOCKS OLD")
  yield takeLatest(GET_SUBGRUPOS, handleGetSubgrupos);
  // yield takeLatest(GET_LINEAS, );
}

export function* saga2() {
  yield takeLatest(GET_GRUPOS_LINEA_BY_SUBGRUPO, handleGetGruposLineaBySubgrupo);
}

// export function* saga3() {
//   yield takeLatest(GET_LINEAS, handleGetGruposLineaBySubgrupo);
// }
export function* saga4() {
  yield takeLatest(GET_LINEAS, handleGetAllLineas);
}
export function* saga5() {
  yield takeLatest(GET_MARCAS, handleGetAllMarcas);
  
}
export function* saga6() {
  yield takeLatest(GET_GRUPOS, handleGetAlltGrupos);
}
