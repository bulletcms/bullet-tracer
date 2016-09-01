import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'dashboard/config';
import {loginAction} from 'dashboard/reducers/actions';

class Home extends React.Component {
  componentWillMount(){
    // this.props.fetchConfig();
  }

  render(){
    return <div>
      <h1>Home</h1>
      <button className="button-primary" onClick={()=>{
          this.props.login();
        }}>Sign in</button>
    </div>;
  }
}

const makeMapStateToProps = ()=>{
  return (state)=>{
    return {};
  };
};

const mapDispatchToProps = (dispatch, props)=>{
  return {
    login: ()=>{
      dispatch(loginAction(CONFIG.retrieve('loginClientId')));
    }
  };
};

Home = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Home);

export {Home};
