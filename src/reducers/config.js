import Immutable from 'immutable';
import {put, call, select} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {createSelector} from 'reselect';


///////////////////
// Rate limiting //
///////////////////

const RATE_LIMIT = 60000;

const shouldUpdateConfig = (state)=>{
  return !(state.get('nav')) || (Date.now() - state.get('lastUpdate') > RATE_LIMIT);
};


/////////////
// Actions //
/////////////

const ACTIONS = {
  fetchConfig: Symbol('fetchConfig'),
  configLoading: Symbol('configLoading'),
  fetchSuccess: Symbol('fetchSuccess'),
  fetchFail: Symbol('fetchFail')
};

const fetchConfigAction = (baseurl)=>{
  return {
    type: ACTIONS.fetchConfig,
    baseurl: baseurl
  };
};

const fetchConfigSagaHelper = function*(action){
  yield put({
    type: ACTIONS.configLoading
  });

  const state = yield select((state)=>{return state.Config;});

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
      payload: state.get('nav')
    });
  }
};

const FetchConfigSaga = function*(){
  yield* takeLatest(ACTIONS.fetchConfig, fetchConfigSagaHelper);
};


/////////////
// Reducer //
/////////////

const defaultState = Immutable.fromJS({
  loading: false,
  failed: false,
  nav: false,
  lastUpdate: Date.now()
});


const Config = (state=defaultState, action)=>{
  switch(action.type){
    case ACTIONS.configLoading:
      return state.set('loading', true).set('failed', false);
    case ACTIONS.fetchSuccess:
      return state.set('loading', false).set('failed', false).set('lastUpdate', Date.now()).setIn(['pages', action.pageid], action.payload);
    case ACTIONS.fetchFail:
      return state.set('loading', false).set('failed', true);
    default:
      return state;
  }
};


//////////////
// Selector //
//////////////

const getPageLoading = (state, props)=>{
  return state.Pages.get('loading');
};

const getPageFailed = (state, props)=>{
  return state.Pages.get('failed');
}

const getPageId = (state, props)=>{
  const {params, location} = props;
  const {pageid} = params;
  return (location.pathname == '/') ? 'indexroute' : pageid;
};

const getPageContent = (state, props)=>{
  return state.Pages.getIn(['pages', getPageId(state, props)]);
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


export {Pages, FetchPageSaga, fetchPageAction, makeGetPage, getPageId};
