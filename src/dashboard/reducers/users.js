import Immutable from 'immutable';
import {take, put, call} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {createSelector} from 'reselect';


/////////////
// Actions //
/////////////

const ACTIONS = {
  fetchUser: Symbol('fetchUser'),
  userLoading: Symbol('userLoading'),
  fetchSuccess: Symbol('fetchSuccess'),
  fetchFail: Symbol('fetchFail'),
  requestLoading: Symbol('requestLoading'),
  requestSuccess: Symbol('requestSuccess'),
  requestFail: Symbol('requestFail')
};

const fetchUserAction = (baseurl, username, method=false, body=false)=>{
  return {
    type: ACTIONS.fetchUser,
    username: username,
    baseurl: baseurl,
    method: method,
    body: body
  };
};

const fetchUserSagaHelper = function*(action){
  if(action.method){
    yield put({
      type: ACTIONS.requestLoading
    });
  } else {
    yield put({
      type: ACTIONS.userLoading
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
      if(options.method == 'PUT'){
        res = yield call(fetch, action.baseurl + '/' + action.username + '/tags', options);
      } else {
        res = yield call(fetch, action.baseurl + '/' + action.username, options);
      }
    } else {
      res = yield call(fetch, action.baseurl + '/' + action.username + '/private');
    }
    const payload = yield call([res, res.json]);
    if(action.method){
      yield put({
        type: ACTIONS.requestSuccess,
        username: action.username,
        payload: payload
      });
    } else {
      yield put({
        type: ACTIONS.fetchSuccess,
        username: action.username,
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

const FetchUserSaga = function*(){
  yield* takeLatest(ACTIONS.fetchUser, fetchUserSagaHelper);
};


/////////////
// Reducer //
/////////////

const defaultState = Immutable.fromJS({
  userLoading: false,
  userFailed: false,
  user: false,
  lastUpdate: Date.now(),
  requestLoading: false,
  requestFailed: false,
  request: false
});

const User = (state=defaultState, action)=>{
  switch(action.type){
    case ACTIONS.userLoading:
      return state.set('userLoading', true).set('userFailed', false);
    case ACTIONS.fetchSuccess:
      return state.set('userLoading', false).set('userFailed', false).set('lastUpdate', Date.now()).set('user', action.payload);
    case ACTIONS.fetchFail:
      return state.set('userLoading', false).set('userFailed', true);
    case ACTIONS.requestLoading:
      return state.set('requestLoading', true).set('requestFailed', false);
    case ACTIONS.requestSuccess:
      return state.set('requestLoading', false).set('requestFailed', false).set('request', action.payload);
    case ACTIONS.requestFail:
      return state.set('requestLoading', false).set('requestFailed', true);
    default:
      return state;
  }
};


//////////////
// Selector //
//////////////

const getUserLoading = (state)=>{
  return state.User.get('userLoading');
};

const getUserFailed = (state)=>{
  return state.User.get('userFailed');
};

const getUserContent = (state)=>{
  return state.User.get('user');
};

const makeGetUser = ()=>{
  return createSelector(
    [getUserLoading, getUserFailed, getUserContent],
    (loading, failed, content)=>{
      if(loading){
        return {loading: true};
      } else if(failed){
        return {loading: false, failed: true};
      }
      if(content){
        return {
          loading: false,
          failed: false,
          content: content
        };
      } else {
        return {
          loading: false,
          failed: false,
          content: false
        };
      }
    }
  );
};

const getUserRequest = (state)=>{
  return state.User.get('request');
};


export {User, FetchUserSaga, fetchUserAction, makeGetUser, getUserRequest};
