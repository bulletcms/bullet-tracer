import Immutable from 'immutable';
import {put, call, select} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {createSelector} from 'reselect';


/////////////
// Actions //
/////////////

const ACTIONS = {
  fetchPage: Symbol('fetchPage'),
  pageLoading: Symbol('pageLoading'),
  fetchSuccess: Symbol('fetchSuccess'),
  fetchFail: Symbol('fetchFail'),
  requestLoading: Symbol('requestLoading'),
  requestSuccess: Symbol('requestSuccess'),
  requestFail: Symbol('requestFail')
};

const fetchPageAction = (baseurl, pageid, method=false, body=false)=>{
  return {
    type: ACTIONS.fetchPage,
    pageid: pageid,
    baseurl: baseurl,
    method: method,
    body: body
  };
};

const fetchPageSagaHelper = function*(action){
  if(action.method){
    yield put({
      type: ACTIONS.requestLoading
    });
  } else {
    yield put({
      type: ACTIONS.pageLoading
    });
  }

  let options = null;
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
    const res = yield call(fetch, action.baseurl + '/' + action.pageid, options);
    const payload = yield call([res, res.json]);
    if(action.method){
      yield put({
        type: ACTIONS.requestSuccess,
        pageid: action.pageid,
        payload: payload
      });
    } else {
      yield put({
        type: ACTIONS.fetchSuccess,
        pageid: action.pageid,
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

const FetchPageSaga = function*(){
  yield* takeLatest(ACTIONS.fetchPage, fetchPageSagaHelper);
};


/////////////
// Reducer //
/////////////

const defaultState = Immutable.fromJS({
  pageLoading: false,
  pageFailed: false,
  page: false,
  lastUpdate: Date.now(),
  requestLoading: false,
  requestFailed: false,
  request: false
});


const Pages = (state=defaultState, action)=>{
  switch(action.type){
    case ACTIONS.pageLoading:
      return state.set('pageLoading', true).set('pageFailed', false);
    case ACTIONS.fetchSuccess:
      return state.set('pageLoading', false).set('pageFailed', false).set('lastUpdate', Date.now()).set('pages', action.payload);
    case ACTIONS.fetchFail:
      return state.set('pageLoading', false).set('pageFailed', true);
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

const getPageLoading = (state, props)=>{
  return state.Pages.get('pageLoading');
};

const getPageFailed = (state, props)=>{
  return state.Pages.get('pageFailed');
};

const getPageContent = (state, props)=>{
  return state.Pages.get('page');
};

const makeGetPage = ()=>{
  return createSelector(
    [getPageLoading, getPageFailed, getPageContent],
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
          title: content.title,
          content: content.content
        };
      } else {
        return {
          loading: false,
          failed: false,
          title: false,
          content: false
        };
      }
    }
  );
};


export {Pages, FetchPageSaga, fetchPageAction};
