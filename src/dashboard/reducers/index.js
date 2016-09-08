import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {Pages, FetchPageSaga, FetchPagelistSaga} from './pages';
import {Config, FetchConfigSaga, FetchAllConfigsSaga} from './config';
import {User, FetchUserSaga} from './users';
import {Login, LoginSaga, NewUserSaga, SignInWithGoogleSaga} from './login';
import {Setup, SetupSaga} from './setup';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({Pages, Config, User, Login, Setup}),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(FetchPageSaga);
sagaMiddleware.run(FetchPagelistSaga);
sagaMiddleware.run(FetchConfigSaga);
sagaMiddleware.run(FetchAllConfigsSaga);
sagaMiddleware.run(FetchUserSaga);
sagaMiddleware.run(LoginSaga);
sagaMiddleware.run(NewUserSaga);
sagaMiddleware.run(SignInWithGoogleSaga);
sagaMiddleware.run(SetupSaga);

export {store};
