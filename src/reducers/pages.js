import Immutable from 'immutable';
import {put, call, select} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';


///////////////////
// Rate limiting //
///////////////////

const RATE_LIMIT = 2000;

const shouldUpdatePage = (state, pageid)=>{
  return !(state.getIn(['pages', pageid])) || (Date.now() - state.get(lastUpdate) > RATE_LIMIT);
};


/////////////
// Actions //
/////////////

const ACTIONS = {
  fetchPage: Symbol('fetchPage'),
  pageLoading: Symbol('pageLoading'),
  fetchSuccess: Symbol('fetchSuccess'),
  fetchFail: Symbol('fetchFail')
};

const fetchPageAction = (baseurl, pageid)=>{
  return {
    type: ACTIONS.fetchPage,
    pageid: pageid,
    baseurl: baseurl
  };
};

const fetchPageSagaHelper = function*(action){
  yield put({
    type: ACTIONS.pageLoading
  });

  const state = yield select((state)=>{return state;});

  if(shouldUpdatePage(state, action.pageid)){
    try {
      const res = yield call(fetch, action.baseurl + '/' + action.pageid);
      const payload = yield call([res, res.json]);
      yield put({
        type: ACTIONS.fetchSuccess,
        pageid: action.pageid,
        payload: payload
      });
    } catch(err) {
      yield put({
        type: ACTIONS.fetchFail
      });
    }
  } else {
    yield put({
      type: ACTIONS.fetchSuccess,
      pageid: action.pageid,
      payload: state.getIn(['pages', action.pageid])
    });
  }
};

const FetchPageSaga = function*(){
  yield* takeLatest(ACTIONS.fetchPage, fetchPageSagaHelper);
};


/////////////
// Reducer //
/////////////

const defaultState = Immutable.fromJS({
  loading: false,
  failed: false,
  pages: Immutable.Map({}),
  lastUpdate: Date.now()
});


const PagesReducer = (state=defaultState, action)=>{
  switch(action.type){
    case ACTIONS.pageLoading:
      return state.set('loading', true).set('failed', false);
    case ACTIONS.fetchSuccess:
      return state.set('loading', false).set('failed', false).setIn(['pages', action.pageid], action.payload);
    case ACTIONS.fetchFail:
      return state.set('loading', false).set('failed', true);
    default:
      return state;
  }
}

export {PagesReducer, FetchPageSaga, fetchPageAction};
