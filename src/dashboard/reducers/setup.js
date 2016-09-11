import Immutable from 'immutable';
import {take, put, call, cps} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';


/////////////
// Actions //
/////////////

const ACTIONS = {
  setup: Symbol('setup'),
  setupSuccess: Symbol('setupSuccess')
};

const setupAction = (baseurl, body)=>{
  return {
    type: ACTIONS.setup,
    baseurl,
    body
  };
};

const setupSagaHelper = function*(action){
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.body)
  };

  try {
    const res = yield call(fetch, action.baseurl, options);
    const payload = yield call([res, res.json]);
    yield put({
      type: ACTIONS.setupSuccess,
      payload: payload
    });
  } catch(err){
  }
};

const SetupSaga = function*(){
  yield* takeLatest(ACTIONS.setup, setupSagaHelper);
};


/////////////
// Reducer //
/////////////

const defaultState = Immutable.fromJS({
  setupRequest: false
});


const Setup = (state=defaultState, action)=>{
  switch(action.type){
    case ACTIONS.setupSuccess:
      return state.set('setupRequest', action.payload);
    default:
      return state;
  }
};


//////////////
// Selector //
//////////////

const getSetupRequest = (state)=>{
  return state.Setup.get('setupRequest');
};


export {Setup, SetupSaga, setupAction, getSetupRequest};
