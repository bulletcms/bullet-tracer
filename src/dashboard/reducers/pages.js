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
  requestFail: Symbol('requestFail'),
  fetchPagelist: Symbol('fetchPagelist'),
  pagelistLoading: Symbol('pagelistLoading'),
  pagelistSuccess: Symbol('pagelistSuccess'),
  pagelistFail: Symbol('pagelistFail')
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

const fetchPagelistAction = (baseurl)=>{
  return {
    type: ACTIONS.fetchPagelist,
    baseurl: baseurl
  };
};

const fetchPagelistSagaHelper = function*(){
  yield put({
    type: ACTIONS.pagelistLoading
  });

  try {
    const res = yield call(fetch, action.baseurl);
    const payload = yield call([res, res.json]);
    yield put({
      type: ACTIONS.pagelistSuccess,
      payload: payload
    });
  } catch(err) {
    yield put({
      type: ACTIONS.pagelistFail
    });
  }
};

const FetchPagelistSaga = function*(){
  yield* takeLatest(ACTIONS.fetchPagelist, fetchPagelistSagaHelper);
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
  request: false,
  pagelistLoading: false,
  pagelistFailed: false,
  pagelist: false
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
        return {pageLoading: true};
      } else if(failed){
        return {pageLoading: false, pageFailed: true};
      }
      if(content){
        return {
          pageLoading: false,
          pageFailed: false,
          pageTitle: content.title,
          pageContent: content.content
        };
      } else {
        return {
          pageLoading: false,
          pageFailed: false,
          pageTitle: false,
          pageContent: false
        };
      }
    }
  );
};

const getPagelistLoading = (state, props)=>{
  return state.Pages.get('pagelistLoading');
};

const getPagelistFailed = (state, props)=>{
  return state.Pages.get('pagelistFailed');
};

const getPagelistContent = (state, props)=>{
  return state.Pages.get('pagelist');
};

const makeGetPagelist = ()=>{
  return createSelector(
    [getPagelistLoading, getPagelistFailed, getPagelistContent],
    (loading, failed, content)=>{
      if(loading){
        return {pageLoading: true};
      } else if(failed){
        return {pageLoading: false, pageFailed: true};
      }
      if(content){
        return {
          pageLoading: false,
          pageFailed: false,
          pagelistContent: content
        };
      } else {
        return {
          pageLoading: false,
          pageFailed: false,
          pagelistContent: false
        };
      }
    }
  );
};


export {Pages, FetchPageSaga, fetchPageAction, fetchPagelistAction, makeGetPage, makeGetPagelist};
