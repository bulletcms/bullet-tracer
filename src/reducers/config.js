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

  if(shouldUpdateConfig(state)){
    try {
      const resNav = yield call(fetch, action.baseurl + '/navigation');
      const payloadNav = yield call([resNav, resNav.json]);
      yield put({
        type: ACTIONS.fetchSuccess,
        payloadNav: payloadNav
      });
    } catch(err) {
      let cached = state.get('nav');
      if(cached){
        yield put({
          type: ACTIONS.fetchSuccess,
          payloadNav: cached
        });
      } else {
        yield put({
          type: ACTIONS.fetchFail
        });
      }
    }
  } else {
    yield put({
      type: ACTIONS.fetchSuccess,
      payloadNav: state.get('nav')
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
      return state.set('loading', false).set('failed', false).set('lastUpdate', Date.now()).set('nav', action.payloadNav);
    case ACTIONS.fetchFail:
      return state.set('loading', false).set('failed', true);
    default:
      return state;
  }
};


//////////////
// Selector //
//////////////

const getConfigLoading = (state)=>{
  return state.Config.get('loading');
};

const getConfigFailed = (state)=>{
  return state.Config.get('failed');
};

const getNavContent = (state)=>{
  return state.Config.get('nav');
};

const makeGetNav = ()=>{
  return createSelector(
    [getConfigLoading, getConfigFailed, getNavContent],
    (loading, failed, navContent)=>{
      if(loading){
        return {loading: true};
      } else if(failed){
        return {loading: false, failed: true};
      }
      if(navContent){
        return {
          loading: false,
          failed: false,
          navContent: navContent
        };
      } else {
        return {
          loading: false,
          failed: false,
          navContent: false
        };
      }
    }
  );
};


export {Config, FetchConfigSaga, fetchConfigAction, makeGetNav};
