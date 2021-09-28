import { call, put } from "redux-saga/effects";
import { /*setGruposLineaBySubgrupo,*/ setMarcasByLinea, setGruposByLineaMarca, setLineas, setSubgrupos } from "../../../ducks/productoStocks.duck";
import { getAllSubgrupos, getMarcasByLinea, /*getLineasStock,*/ getAllLineas, getGruposByLineaMarca } from "../requests/productoStocks.requests";

export function* handleGetSubgrupos() {
  try {
    const response = yield call(getAllSubgrupos);
    console.log("WENTROOOOOOOO  A LINEAS")
    const { data } = response;
    yield put(setSubgrupos(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetMarcasByLinea(action) {
  try {
    const response = yield call(getMarcasByLinea, action.id);
    const { data } = response;
    // yield put(setGruposLineaBySubgrupo(data));
    console.log("LA DATA EN HANDLER: ", JSON.stringify(data))
    yield put(setMarcasByLinea(data));
    console.log("EL GETMARCASBYLINEA SETED: ", JSON.stringify(getMarcasByLinea))
    // console.log("EL GETMARCASBYLINEA SETED: ", JSON.stringify(marcas))
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetGruposByLineaMarca(action) {
  try {
    const response = yield call(getGruposByLineaMarca, action.id);
    const { data } = response;
    // yield put(setGruposLineaBySubgrupo(data));
    console.log("LA DATA EN HANDLER getGruposByLineaMarca: ", JSON.stringify(data))
    yield put(setGruposByLineaMarca(data));
    console.log("EL GETMARCASBYLINEA SETED: ", JSON.stringify(getGruposByLineaMarca))
  } catch (error) {
    console.log(error);
  }
}

/*export function* handleGetLineas() {
  try {
    console.log("LAS LINEAS Q QUIERE CONSEGUIRRR")
    const response = yield call(getLineasStock);
    const { data } = response;
    console.log("LA DATA", data)
    yield put(setLineas(data));
  } catch (error) {
    console.log(error);
  }
}*/

// HECHO POR MANUEL CORONEL
export function* handleGetLineasV() {
  try {
    const response = yield call(getAllLineas);
    console.log("ENTRA A LINEAS A TRAERME  A STOCKS CARAJO!!")
    const { data } = response;
    yield put(setLineas(data));
  } catch (error) {
    console.log(error);
  }
}