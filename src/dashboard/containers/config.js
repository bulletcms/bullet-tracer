import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import {CONFIG} from 'dashboard/config';
import {fetchConfigAction} from 'dashboard/reducers/actions';
import {makeGetConfig, getConfigRequest, getLogin, getLoginExpiresAt, getLoginValid} from 'dashboard/reducers/selectors';
import {Input, Textarea} from 'views';

class Config extends React.Component {
  componentWillMount(){
    this.props.fetchConfig('navigation');
  }
  render(){
    return <div>
      {(!this.props.config.loading && !this.props.config.failed) && this.props.config.content &&
        JSON.stringify(this.props.config.content)
      }
    </div>;
  }
}

const makeMapStateToProps = ()=>{
  const getConfig = makeGetConfig();
  return (state)=>{
    return {
      config: getConfig(state),
      request: getConfigRequest(state),
      logininfo: getLogin(state),
      loginExpiresAt: getLoginExpiresAt(state)
    };
  };
};

const mapDispatchToProps = (dispatch)=>{
  return {
    fetchConfig: (configid, method=false, body=false)=>{
      dispatch(fetchConfigAction(CONFIG.retrieve('baseConfigUrl'), configid, method, body));
    },
    loginValid: (time)=>{
      return getLoginValid(time);
    }
  };
};

Config = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Config);

export {Config};
