import Immutable from 'immutable';
import {take, put, call, select} from 'redux-saga/effects';
import {createSelector} from 'reselect';


/////////////
// Actions //
/////////////

const ACTIONS = {
  login: Symbol('login'),
};

const loginAction = (clientId)=>{
  return {
    type: ACTIONS.login,
    clientId: clientId
  };
};

const LoginSaga = function*(){
  while(true){
    const loginaction = yield take(ACTIONS.login);
    yield call([gapi, gapi.load], 'auth2', ()=>{
      const auth2 = gapi.auth2.init({
        client_id: loginaction.clientId,
        fetch_basic_profile: false,
        scope: scope
      });
      auth2.signIn().then((googleUser)=>{
        console.log(googleUser);
      });
    });
  }
};
