import { takeLatest } from "redux-saga/effects";
import { GET_SUBGRUPOS, /*GET_GRUPOS_LINEA_BY_SUBGRUPO,*/GET_MARCAS_BY_LINEA, GET_LINEAS, GET_GRUPOS_BY_LINEAMARCA } from "../../../ducks/productoStocks.duck";
import { handleGetSubgrupos, /*handleGetGruposLineaBySubgrupo,*/ handleGetMarcasByLinea, handleGetLineasV, handleGetGruposByLineaMarca } from "../handlers/productoStocks.handlers";

export function* saga() {
  /// yield takeLatest(GET_SUBGRUPOS, handleGetSubgrupos);
  console.log("ENTRA A LA SAGA!!!!!!!!!! DE PRODUCTO STOCKS")
  yield takeLatest(GET_LINEAS, handleGetLineasV);
}

export function* saga2() {
  yield takeLatest(GET_MARCAS_BY_LINEA, handleGetMarcasByLinea);
}

export function* saga3() {
  // yield takeLatest(GET_LINEAS, handleGetGruposLineaBySubgrupo);
  yield takeLatest(GET_GRUPOS_BY_LINEAMARCA, handleGetGruposByLineaMarca);
}
