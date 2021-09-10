import { takeLatest } from "redux-saga/effects";
import { handleAddProducto, handleEditProducto, handleGetProducto, handleGetProductos, handleGetProductosByLinea, handleGetSerialModelo, handleSoftDeleteProducto } from "../handlers/producto.handlers";
import { ADD_PRODUCTO, EDIT_PRODUCTO, GET_PRODUCTO, GET_PRODUCTOS, GET_PRODUCTOS_BY_LINEA, GET_SERIAL_MODELO, SOFT_DELETE_PRODUCTO } from "../../../ducks/producto.duck";

export function* watcherSaga() {
  yield takeLatest(GET_PRODUCTOS, handleGetProductos);
}

export function* watcherSaga2() {
    yield takeLatest(GET_PRODUCTO, handleGetProducto);
}

export function* watcherSaga3() {
    yield takeLatest(GET_PRODUCTOS_BY_LINEA, handleGetProductosByLinea);
}

export function* watcherSaga4() {
    yield takeLatest(ADD_PRODUCTO, handleAddProducto);
}

export function* watcherSaga5() {
    yield takeLatest(EDIT_PRODUCTO, handleEditProducto);
}

export function* watcherSaga6() {
    yield takeLatest(SOFT_DELETE_PRODUCTO, handleSoftDeleteProducto);
}

export function* watcherSaga7() {
    yield takeLatest(GET_SERIAL_MODELO, handleGetSerialModelo);
}