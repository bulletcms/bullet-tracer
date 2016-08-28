import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {Pages, FetchPageSaga} from './pages';
import {Config, FetchConfigSaga} from './config';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({Pages, Config}),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(FetchPageSaga);
sagaMiddleware.run(FetchConfigSaga);

export {store};
