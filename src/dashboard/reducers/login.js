import Immutable from 'immutable';
import {take, put, call, cps} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';


/////////////
// Actions //
/////////////

const ACTIONS = {
  login: Symbol('login'),
  logout: Symbol('logout'),
  loginSuccess: Symbol('loginSuccess'),
  loginFail: Symbol('loginFail'),
  logoutSuccess: Symbol('logoutSuccess'),
  newUser: Symbol('newUser'),
  newUserSuccess: Symbol('newUserSuccess'),
  signInWithGoogle: Symbol('signInWithGoogle')
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
    if(!window.gapi.auth2){
      yield cps([window.gapi, window.gapi.load], 'auth2');
      window.gapi.auth2.init({
        client_id: loginaction.clientId
      });
    }
    const auth2 = window.gapi.auth2.getAuthInstance();
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

const newUserAction = (baseurl, body)=>{
  return {
    type: ACTIONS.newUser,
    baseurl: baseurl,
    body: body
  };
};

const newUserSagaHelper = function*(action){
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.body)
  };

  try {
    const res = yield call(fetch, action.baseurl, options);
    const payload = yield call([res, res.json]);
    yield put({
      type: ACTIONS.newUserSuccess,
      payload: payload
    });
  } catch(err){
  }
};

const NewUserSaga = function*(){
  yield* takeLatest(ACTIONS.newUser, newUserSagaHelper);
};

const signInWithGoogleAction = (clientId, callback)=>{
  return {
    type: ACTIONS.signInWithGoogle,
    clientId: clientId,
    callback: callback
  };
};

const signInWithGoogleSagaHelper = function*(action){
  if(!window.gapi.auth2){
    yield cps([window.gapi, window.gapi.load], 'auth2');
    window.gapi.auth2.init({
      client_id: action.clientId
    });
  }
  const auth2 = window.gapi.auth2.getAuthInstance();
  const googleUser = yield call([auth2, auth2.signIn])
  const signedIn = googleUser.isSignedIn();
  if(signedIn){
    const basicProfile = googleUser.getBasicProfile();
    const name = basicProfile.getGivenName();
    const lastName = basicProfile.getFamilyName();
    const fullName = basicProfile.getName();
    const email = basicProfile.getEmail();
    const googleId = basicProfile.getId();
    const profilePicture = basicProfile.getImageUrl();

    yield call(action.callback, {name, lastName, fullName, email, googleId, profilePicture});
  }
};

const SignInWithGoogleSaga = function*(){
  yield* takeLatest(ACTIONS.signInWithGoogle, signInWithGoogleSagaHelper)
}


/////////////
// Reducer //
/////////////

const defaultState = Immutable.fromJS({
  loggedIn: false,
  expiresAt: false,
  idToken: false,
  username: false,
  newUserRequest: false
});


const Login = (state=defaultState, action)=>{
  switch(action.type){
    case ACTIONS.loginSuccess:
      return state.set('loggedIn', true).set('username', action.username).set('idToken', action.idToken).set('expiresAt', action.expiresAt);
    case ACTIONS.logoutSuccess:
      return state.set('loggedIn', false).set('username', false).set('idToken', false).set('expiresAt', false);
    case ACTIONS.newUserSuccess:
      return state.set('newUserRequest', action.payload);
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

const getNewUserRequest = (state)=>{
  return state.Login.get('newUserRequest');
};


export {Login, LoginSaga, NewUserSaga, SignInWithGoogleSaga, loginAction, logoutAction, newUserAction, signInWithGoogleAction, getLogin, getLoginExpiresAt, getLoginValid, getNewUserRequest};
