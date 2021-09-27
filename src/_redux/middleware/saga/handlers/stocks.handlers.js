import { call, put } from "redux-saga/effects";
import { setGruposLineaBySubgrupo, setLineas, setSubgrupos } from "../../../ducks/stocks.duck";
import { getAllSubgrupos, getGruposLineaBySubgrupo, getLineasStock, getAllLineas } from "../requests/stocks.requests";

export function* handleGetSubgrupos() {
  try {
    const response = yield call(getAllSubgrupos);
    console.log("WENTROOOOOOOO  ASTOCK HABDEL")
    const { data } = response;
    yield put(setSubgrupos(data));
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetGruposLineaBySubgrupo(action) {
  try {
    const response = yield call(getGruposLineaBySubgrupo, action.id);
    const { data } = response;
    yield put(setGruposLineaBySubgrupo(data));
    console.log("EL handleGetGruposLineaBySubgrupo SETED: ", JSON.stringify(getGruposLineaBySubgrupo))
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetLineas() {
  try {
    console.log("LAS LINEAS Q QUIERE CONSEGUIRRR")
    const response = yield call(getLineasStock);
    const { data } = response;
    console.log("LA DATA", data)
    yield put(setLineas(data));
  } catch (error) {
    console.log(error);
  }
}
// HECHO POR MANUEL CORONEL
/*export function* handleGetLineas() {
  try {
    const response = yield call(getAllLineas);
    console.log("ENTRA A LINEAS A TRAERME  A STOCKS CARAJO!!")
    const { data } = response;
    yield put(setLineas(data));
  } catch (error) {
    console.log(error);
  }
}*/