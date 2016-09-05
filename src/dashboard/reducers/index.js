import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {Pages, FetchPageSaga, FetchPagelistSaga} from './pages';
import {Config, FetchConfigSaga, FetchAllConfigsSaga} from './config';
import {Login, LoginSaga} from './login';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({Pages, Config, Login}),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(FetchPageSaga);
sagaMiddleware.run(FetchPagelistSaga);
sagaMiddleware.run(FetchConfigSaga);
sagaMiddleware.run(FetchAllConfigsSaga);
sagaMiddleware.run(LoginSaga);

export {store};
