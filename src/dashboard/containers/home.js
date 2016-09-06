import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'dashboard/config';
import {signInWithGoogleAction} from 'dashboard/reducers/actions';
import {Input, Modal} from 'views';


const blankUser = ()=>{
  return {

  };
};

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      createUser: false,
      newUser: false,
      beginSetup: false
    };
  }

  componentWillMount(){

  }

  render(){
    return <div>
      <h1>Home</h1>
      <div className="button-row">
        <button className="button-primary"
          onClick={()=>{
            this.setState({...this.state, createUser: true, newUser: blankUser()});
          }}>Create Account</button>
      </div>
      <div className="button-row">
        <button className="button-outline"
          onClick={()=>{
            this.setState({...this.state, beginSetup: true});
          }}>Setup</button>
      </div>

      <Modal isOpen={this.state.createUser}>
        <h1>Create Account</h1>
        <div className="button-row">
          <button onClick={()=>{this.setState({...this.state, createUser: false, newUser: false});}}>Cancel</button>
        </div>
        <div className="button-row">
          <button className="button-outline-primary" onClick={()=>{this.props.signInWithGoogle();}}>Sign In with Google</button>
        </div>
      </Modal>

      <Modal isOpen={this.state.beginSetup}>
        <h1>Setup BulletCMS</h1>
        <div className="button-row">
          <button onClick={()=>{this.setState({...this.state, beginSetup: false});}}>Cancel</button>
        </div>
      </Modal>
    </div>;
  }
}

const mapStateToProps = (state)=>{
  return {
  };
};

const mapDispatchToProps = (dispatch, props)=>{
  return {
    signInWithGoogle: (username)=>{
      dispatch(signInWithGoogleAction(CONFIG.retrieve('loginClientId')));
    }
  };
};

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);


export {Home};
