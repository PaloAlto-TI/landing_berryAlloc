import { call, put } from "redux-saga/effects";
import { setGruposLineaBySubgrupo, setSubgrupos } from "../../../ducks/stocks.duck";
import { getAllSubgrupos, getGruposLineaBySubgrupo } from "../requests/stocks.requests";

export function* handleGetSubgrupos() {
  try {
    const response = yield call(getAllSubgrupos);
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
  } catch (error) {
    console.log(error);
  }
}