import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';


const sagaMiddleware = createSagaMiddleware();

const defaultState = {};

const TestReducer = (state=defaultState, action)=>{
  switch(action.type){
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({TestReducer}),
  applyMiddleware(sagaMiddleware)
);

// sagaMiddleware.run();

export {store};
