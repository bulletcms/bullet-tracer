import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {Pages, FetchPageSaga} from './pages';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({Pages}),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(FetchPageSaga);

export {store};
