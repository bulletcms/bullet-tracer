import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import {CONFIG} from 'dashboard/config';
import {fetchUserAction} from 'dashboard/reducers/actions';
import {makeGetUser, getUserRequest, getLogin, getLoginExpiresAt, getLoginValid} from 'dashboard/reducers/selectors';
import {Input} from 'views';


class UserDisplay extends React.Component{
  /**
   * props:
   *   model: model to display
   *   edit: function to call when editing
   */
  render(){
    return <div>
      {Object.keys(this.props.model).map((i)=>{
        return <div key={i}>
          <h6>{i}</h6>
          <span>{JSON.stringify(this.props.model[i])}</span>
        </div>;
      })}
      <div className="button-row">
        <button className="button-outline" onClick={()=>{
          if(this.props.edit){
            this.props.edit();
          }
        }}>
          Edit
        </button>
      </div>
    </div>;
  }
}

class UserEdit extends React.Component{
  constructor(props){
    super(props);
    const shallowState = {};
    Object.keys(this.props.model).map((i)=>{
      shallowState[i] = JSON.stringify(this.props.model[i]);
    });
    this.state = {data: Immutable.fromJS(shallowState)};
  }

  /**
   * props:
   *   model: model to edit
   *   error: error object
   *   cancel: function to call when cancelling edit
   *   check: function to call when verifying data
   *   save: function to call when saving edits
   */
  render(){
    return <div>
      <h4>{this.props.title}</h4>
      <div className="button-row">
        <button className="button-outline" onClick={()=>{
          if(this.props.cancel){
            this.props.cancel();
          }
        }}>
          Cancel
        </button>
        <button className="button-outline" onClick={()=>{
          if(this.props.check){
            this.props.check(this.state.data.toJSON());
          }
        }}>
          Check
        </button>
        <button className="button-primary" onClick={()=>{
          if(this.props.save){
            this.props.save(this.state.data.toJSON());
          }
        }}>
          Save
        </button>
      </div>
      {Object.keys(this.props.model).map((i)=>{
        return <Input key={i} label={i} value={this.state.data.get(i)} error={this.props.error && this.props.error[i]}
          handleBlur={(value)=>{this.setState({data: this.state.data.set(i, value)});}}/>
      })}
    </div>;
  }
}

class User extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      edit: false,
      error: false
    };
  }

  componentWillMount(){
  }

  validate(userObject){
    let failed = false;
    const error = {};
    Object.keys(userObject).map((i)=>{
      try{
        JSON.parse(userObject[i]);
        error[i] = false;
      } catch(err){
        failed = true;
        error[i] = err.toString();
      }
    });
    if(failed){
      return [true, error];
    } else {
      return [false, error];
    }
  }

  render(){
    return <div>
      <h1>Users</h1>
      <Input label="username" handleBlur={(value)=>{this.setState({...this.state, username: value})}}/>
      <div className="button-row">
        <button className="button-outline-primary" onClick={()=>{
          if(this.props.logininfo && this.props.loginValid(this.props.loginExpiresAt)){
            const {username, idToken} = this.props.logininfo;
            this.props.fetchUser(this.state.username, 'GET', {username, idToken});
          }
        }}>
          Get User
        </button>
      </div>
      {(!this.props.user.loading && !this.props.user.failed) && this.props.user.content &&
        <div>
          {!this.state.edit &&
            <UserDisplay model={this.props.user.content} edit={()=>{this.setState({...this.state, edit: true, error: err});}}/>
          }
          {this.state.edit &&
            <UserEdit model={this.props.user.content} error={this.state.error}
              cancel={()=>{
                this.setState({...this.state, edit: false, error: false});
              }}
              check={(data)=>{
                this.setState({...this.state, error: this.validate(data)[1]});
              }}
              save={(data)=>{
                const [failed, err] = this.validate(data);
                if(failed){
                  this.setState({...this.state, error: err});
                } else {
                  this.setState({...this.state, error: err, edit: false});
                  if(this.props.logininfo && this.props.loginValid(this.props.loginExpiresAt)){
                    const {username, idToken} = this.props.logininfo;
                    const deepState = {};
                    Object.keys(data).map((i)=>{
                      deepState[i] = JSON.parse(data[i]);
                    });
                    this.props.fetchUser(deepState.username, 'PUT', {username, idToken, data: deepState});
                  }
                }
              }}/>
          }
        </div>
      }
      {this.props.request &&
        <pre className="request-status">
          {this.props.request.status && <span>request success for user: {this.props.request.username}</span>}
          {!this.props.request.status && <span>request failed for user: {this.props.request.username}</span>}
        </pre>
      }
    </div>;
  }
}

const makeMapStateToProps = ()=>{
  const getUser = makeGetUser();
  return (state)=>{
    return {
      user: getUser(state),
      request: getUserRequest(state),
      logininfo: getLogin(state),
      loginExpiresAt: getLoginExpiresAt(state)
    };
  };
};

const mapDispatchToProps = (dispatch)=>{
  return {
    fetchUser: (username, method=false, body=false)=>{
      dispatch(fetchUserAction(CONFIG.retrieve('baseUsersUrl'), username, method, body));
    },
    loginValid: (time)=>{
      return getLoginValid(time);
    }
  };
};

User = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(User);

export {User};
