import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {Pages, FetchPageSaga, FetchPagelistSaga} from './pages';
import {LoginSaga} from './login';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({Pages}),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(FetchPageSaga);
sagaMiddleware.run(FetchPagelistSaga);
sagaMiddleware.run(LoginSaga);

export {store};
