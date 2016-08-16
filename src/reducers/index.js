import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {PagesReducer, FetchPageSaga} from './pages';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({PagesReducer}),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(FetchPageSaga);

export {store};
