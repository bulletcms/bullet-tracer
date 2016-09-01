import Immutable from 'immutable';
import {take, put, call, cps, select} from 'redux-saga/effects';
import {createSelector} from 'reselect';


/////////////
// Actions //
/////////////

const ACTIONS = {
  login: Symbol('login'),
  logout: Symbol('logout')
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
    yield cps([window.gapi, window.gapi.load], 'auth2');
    const auth2 = window.gapi.auth2.init({
      client_id: loginaction.clientId
    });
    const googleUser = yield call([auth2, auth2.signIn])
    const signedIn = googleUser.isSignedIn();
    if(signedIn){
      const {id_token, expires_at} = googleUser.getAuthResponse();

      const logoutaction = yield take(ACTIONS.logout);
      yield call([auth2, auth2.signOut]);
    }
  }
};

export {LoginSaga, loginAction};
