import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'dashboard/config';
import {loginAction, logoutAction} from 'dashboard/reducers/actions';
import {getLogin} from 'dashboard/reducers/selectors';
import {Input} from 'views';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {username: ''};
  }

  componentWillMount(){
    // this.props.fetchConfig();
  }

  render(){
    return <div>
      <h1>Home</h1>
      {!this.props.logininfo && <div>
        <Input label="username"
          handleBlur={(value)=>{
            this.setState({username: value});}}/>
        <button className="button-primary" onClick={()=>{
            if(this.state.username.length > 1){
              this.props.login(this.state.username);
            }
          }}>Login</button>
      </div>}
      {this.props.logininfo && <div>
        <h6>Signed in as: {this.props.logininfo.username}</h6>
        <button className="button-outline-primary" onClick={()=>{
            this.props.logout();
          }}>Logout</button>
      </div>}
    </div>;
  }
}

const mapStateToProps = (state)=>{
  return {
    logininfo: getLogin(state)
  };
};

const mapDispatchToProps = (dispatch, props)=>{
  return {
    login: (username)=>{
      dispatch(loginAction(CONFIG.retrieve('loginClientId'), username));
    },
    logout: ()=>{
      dispatch(logoutAction());
    }
  };
};

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export {Home};
