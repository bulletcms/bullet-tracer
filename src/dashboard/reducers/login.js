import Immutable from 'immutable';
import {take, put, call, cps, select} from 'redux-saga/effects';
import {createSelector} from 'reselect';


/////////////
// Actions //
/////////////

const ACTIONS = {
  login: Symbol('login'),
  logout: Symbol('logout'),
  loginSuccess: Symbol('loginSuccess'),
  loginFail: Symbol('loginFail'),
  logoutSuccess: Symbol('logoutSuccess')
};

const loginAction = (clientId, username)=>{
  return {
    type: ACTIONS.login,
    clientId: clientId,
    username: username
  };
};

const logoutAction = ()=>{
  return {
    type: ACTIONS.logout
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

      yield put({
        type: ACTIONS.loginSuccess,
        idToken: id_token,
        username: loginaction.username,
        expiresAt: expires_at
      });

      const logoutaction = yield take(ACTIONS.logout);
      yield call([auth2, auth2.signOut]);
      yield put({
        type: ACTIONS.logoutSuccess
      });
    } else {
      yield put({
        type: ACTIONS.loginFail
      });
    }
  }
};


/////////////
// Reducer //
/////////////

const defaultState = Immutable.fromJS({
  loggedIn: false,
  expiresAt: false,
  idToken: false,
  username: false
});


const Login = (state=defaultState, action)=>{
  switch(action.type){
    case ACTIONS.loginSuccess:
      return state.set('loggedIn', true).set('username', action.username).set('idToken', action.idToken).set('expiresAt', action.expiresAt);
    case ACTIONS.logoutSuccess:
      return state.set('loggedIn', false).set('username', false).set('idToken', false).set('expiresAt', false);
    default:
      return state;
  }
};


//////////////
// Selector //
//////////////

const getLoggedIn = (state)=>{
  return state.Login.get('loggedIn');
};

const getLoginExpiresAt = (state)=>{
  return state.Login.get('expiresAt');
};

const getIdToken = (state)=>{
  return state.Login.get('idToken');
};

const getUsername = (state)=>{
  return state.Login.get('username');
};

const getLoginValid = (time)=>{
  return Date.now() < time - 2000;
};

const getLogin = (state)=>{
  const loggedIn = getLoggedIn(state);
  const expiresAt = getLoginExpiresAt(state);
  const idToken = getIdToken(state);
  const username = getUsername(state);

  if(loggedIn){
    if(getLoginValid(expiresAt)){
      return {idToken, username};
    }
  }

  return false;
};

export {Login, LoginSaga, loginAction, logoutAction, getLogin, getLoginExpiresAt, getLoginValid};
