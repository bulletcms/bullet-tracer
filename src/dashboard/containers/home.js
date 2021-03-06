import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'dashboard/config';
import {newUserAction, signInWithGoogleAction, setupAction} from 'dashboard/reducers/actions';
import {getNewUserRequest, getSetupRequest} from 'dashboard/reducers/selectors';
import {Input, Modal} from 'views';


const blankUser = ()=>{
  return {
    'username': '',
    'name': '',
    'fullName': '',
    'lastName': '',
    'email': '',
    'googleId': '',
    'profilePicture': ''
  };
};

const blankErrors = ()=>{
  return {
    username: false,
    name: false,
    lastName: false,
    fullName: false,
    email: false,
    googleId: false,
    profilePicture: false,
  };
};

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      createUser: false,
      newUser: false,
      userErrors: false,
      beginSetup: false
    };
  }

  componentWillMount(){

  }

  validate(userObject){
    const {username, name, lastName, fullName, email, googleId, profilePicture} = userObject;
    const error = blankErrors();

    let failed = false;
    if(!/^[a-zA-Z0-9_]+$/.test(username)){
      error.username = 'must only contain alphanumeric and _';
      failed = true;
    }
    if(!/^.+$/.test(name)){
      error.name = 'must not contain any newline characters';
      failed = true;
    }
    if(!/^.+$/.test(lastName)){
      error.lastName = 'must not contain any newline characters';
      failed = true;
    }
    if(!/^.+$/.test(fullName)){
      error.fullName = 'must not contain any newline characters';
      failed = true;
    }
    if(!/^\S+@\S+$/.test(email)){
      error.email = 'not valid email';
      failed = true;
    }
    if(!/^\d+$/.test(googleId)){
      error.googleId = 'not valid googleId';
      failed = true;
    }
    if(!/^(http[s]?):\/\/(\S+?)((\/\w+)*\/)(\S+)$/.test(profilePicture)){
      error.googleId = 'not valid url';
      failed = true;
    }

    if(failed){
      return [true, error];
    } else {
      return [false, error];
    }
  }

  render(){
    return <div>
      <h1>Home</h1>
      <div className="button-row">
        <button className="button-primary"
          onClick={()=>{
            this.setState({...this.state, createUser: true, newUser: blankUser(), userErrors: blankErrors()});
          }}>Create Account</button>
      </div>
      <div className="button-row">
        <button className="button-outline"
          onClick={()=>{
            this.setState({...this.state, beginSetup: true, newUser: blankUser(), userErrors: blankErrors()});
          }}>Setup</button>
      </div>

      {this.props.newUserRequest &&
        <pre className="request-status">
          {this.props.newUserRequest.status && <span>new user request success for user: {this.props.newUserRequest.username}</span>}
          {!this.props.newUserRequest.status && <span>new user request failed for user: {this.props.newUserRequest.username}</span>}
        </pre>
      }
      {this.props.setupRequest &&
        <pre className="request-status">
          {this.props.setupRequest.status && <span>setup request success</span>}
          {!this.props.setupRequest.status && <span>setup request failed</span>}
        </pre>
      }

      <Modal isOpen={this.state.createUser}>
        <h1>Create Account</h1>
        <div className="button-row">
          <button onClick={()=>{this.setState({...this.state, createUser: false, newUser: false, userErrors: false});}}>Cancel</button>
        </div>
        <div className="button-row">
          <button className="button-outline-primary" onClick={()=>{
            this.props.signInWithGoogle(async (data)=>{this.setState({...this.state, newUser: {...this.state.newUser, ...data}});});
          }}>Sign In with Google</button>
        </div>

        <Input label="username" value={this.state.newUser.username} error={this.state.userErrors.username}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, username: value}});}}/>
        <Input label="name" value={this.state.newUser.name} error={this.state.userErrors.name}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, name: value}});}}/>
        <Input label="last name" value={this.state.newUser.lastName} error={this.state.userErrors.lastName}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, lastName: value}});}}/>
        <Input label="full name" value={this.state.newUser.fullName} error={this.state.userErrors.fullName}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, fullName: value}});}}/>
        <Input label="email" value={this.state.newUser.email} error={this.state.userErrors.email}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, email: value}});}}/>
        <Input label="Google Id" value={this.state.newUser.googleId} error={this.state.userErrors.googleId}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, googleId: value}});}}/>
        <Input label="profile picture" value={this.state.newUser.profilePicture} error={this.state.userErrors.profilePicture}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, profilePicture: value}});}}/>

        <div className="button-row">
          <button className="button-primary" onClick={()=>{
            const [failed, error] = this.validate(this.state.newUser);
            if(failed){
              this.setState({...this.state, userErrors: error});
            } else {
              this.props.newUser({data: this.state.newUser});
              this.setState({...this.state, createUser: false, newUser: false, userErrors: false});
            }
          }}>Create Account</button>
        </div>
      </Modal>

      <Modal isOpen={this.state.beginSetup}>
        <h1>Setup BulletCMS</h1>
        <div className="button-row">
          <button onClick={()=>{this.setState({...this.state, beginSetup: false, newUser: false, userErrors: false});}}>Cancel</button>
        </div>
        <div className="button-row">
          <button className="button-outline-primary" onClick={()=>{
            this.props.signInWithGoogle(async (data)=>{this.setState({...this.state, newUser: {...this.state.newUser, ...data}});});
          }}>Sign In with Google</button>
        </div>

        <Input label="username" value={this.state.newUser.username} error={this.state.userErrors.username}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, username: value}});}}/>
        <Input label="name" value={this.state.newUser.name} error={this.state.userErrors.name}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, name: value}});}}/>
        <Input label="last name" value={this.state.newUser.lastName} error={this.state.userErrors.lastName}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, lastName: value}});}}/>
        <Input label="full name" value={this.state.newUser.fullName} error={this.state.userErrors.fullName}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, fullName: value}});}}/>
        <Input label="email" value={this.state.newUser.email} error={this.state.userErrors.email}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, email: value}});}}/>
        <Input label="Google Id" value={this.state.newUser.googleId} error={this.state.userErrors.googleId}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, googleId: value}});}}/>
        <Input label="profile picture" value={this.state.newUser.profilePicture} error={this.state.userErrors.profilePicture}
          handleBlur={(value)=>{this.setState({...this.state, newUser: {...this.state.newUser, profilePicture: value}});}}/>

        <div className="button-row">
          <button className="button-primary" onClick={()=>{
            const [failed, error] = this.validate(this.state.newUser);
            if(failed){
              this.setState({...this.state, userErrors: error});
            } else {
              this.props.setup({data: this.state.newUser});
              this.setState({...this.state, beginSetup: false, newUser: false, userErrors: false});
            }
          }}>Setup Bullet Server</button>
        </div>
      </Modal>
    </div>;
  }
}

const mapStateToProps = (state)=>{
  return {
    newUserRequest: getNewUserRequest(state),
    setupRequest: getSetupRequest(state)
  };
};

const mapDispatchToProps = (dispatch, props)=>{
  return {
    signInWithGoogle: (callback)=>{
      dispatch(signInWithGoogleAction(CONFIG.retrieve('loginClientId'), callback));
    },
    newUser: (body)=>{
      dispatch(newUserAction(CONFIG.retrieve('baseUsersUrl'), body));
    },
    setup: (body)=>{
      dispatch(setupAction(CONFIG.retrieve('baseSetupUrl'), body));
    }
  };
};

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);


export {Home};
