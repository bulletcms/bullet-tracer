import Immutable from 'immutable';
import {put, call, select} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {createSelector} from 'reselect';

/////////////
// Actions //
/////////////

const ACTIONS = {
  fetchConfig: Symbol('fetchConfig'),
  configLoading: Symbol('pageLoading'),
  fetchSuccess: Symbol('fetchSuccess'),
  fetchFail: Symbol('fetchFail'),
  requestLoading: Symbol('requestLoading'),
  requestSuccess: Symbol('requestSuccess'),
  requestFail: Symbol('requestFail'),
};

const fetchConfigAction = (baseurl, configid, method=false, body=false)=>{
  return {
    type: ACTIONS.fetchConfig,
    configid: configid,
    baseurl: baseurl,
    method: method,
    body: body
  };
};

const fetchConfigSagaHelper = function*(action){
  if(action.method){
    yield put({
      type: ACTIONS.requestLoading
    });
  } else {
    yield put({
      type: ACTIONS.configLoading
    });
  }

  let options = false;
  if(action.method){
    options = {
      method: action.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.body)
    };
  }

  try {
    let res;
    if(options){
      if(options.method == 'POST'){
        res = yield call(fetch, action.baseurl, options);
      } else {
        res = yield call(fetch, action.baseurl + '/' + action.configid, options);
      }
    } else {
      res = yield call(fetch, action.baseurl + '/' + action.configid);
    }
    const payload = yield call([res, res.json]);
    if(action.method){
      yield put({
        type: ACTIONS.requestSuccess,
        configid: action.configid,
        payload: payload
      });
    } else {
      yield put({
        type: ACTIONS.fetchSuccess,
        configid: action.configid,
        payload: payload
      });
    }
  } catch(err) {
    if(action.method){
      yield put({
        type: ACTIONS.requestFail
      });
    } else {
      yield put({
        type: ACTIONS.fetchFail
      });
    }
  }
};

const FetchConfigSaga = function*(){
  yield* takeLatest(ACTIONS.fetchConfig, fetchConfigSagaHelper);
};


/////////////
// Reducer //
/////////////

const defaultState = Immutable.fromJS({
  configLoading: false,
  configFailed: false,
  config: {},
  lastUpdate: Date.now(),
  requestLoading: false,
  requestFailed: false,
  request: false
});

const Config = (state=defaultState, action)=>{
  switch(action.type){
    case ACTIONS.pageLoading:
      return state.set('pageLoading', true).set('pageFailed', false);
    case ACTIONS.fetchSuccess:
      return state.set('pageLoading', false).set('pageFailed', false).set('lastUpdate', Date.now()).set('page', action.payload);
    case ACTIONS.fetchFail:
      return state.set('pageLoading', false).set('pageFailed', true);
    case ACTIONS.newPage:
      return state.set('pageLoading', false).set('pageFailed', false).set('page', {pageid: '', title: '', tags: [], content: ''});
    case ACTIONS.requestLoading:
      return state.set('requestLoading', true).set('requestFailed', false);
    case ACTIONS.requestSuccess:
      return state.set('requestLoading', false).set('requestFailed', false).set('request', action.payload);
    case ACTIONS.requestFail:
      return state.set('requestLoading', false).set('requestFailed', true);
    case ACTIONS.pagelistLoading:
      return state.set('pagelistLoading', true).set('pagelistFailed', false);
    case ACTIONS.pagelistSuccess:
      return state.set('pagelistLoading', false).set('pagelistFailed', false).set('pagelist', action.payload);
    case ACTIONS.pagelistFail:
      return state.set('pagelistLoading', false).set('pagelistFailed', true);
    default:
      return state;
  }
};
