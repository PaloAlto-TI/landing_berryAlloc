import * as watcher from './sagas/producto.sagas';
export function initSagas(sagaMiddleware) {
  Object.values(watcher).forEach(sagaMiddleware.run.bind(sagaMiddleware));
 
}