import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import {CONFIG} from 'dashboard/config';
import {fetchConfigAction, fetchAllConfigsAction} from 'dashboard/reducers/actions';
import {makeGetConfig, getConfigRequest, getLogin, getLoginExpiresAt, getLoginValid} from 'dashboard/reducers/selectors';
import {Input, Textarea} from 'views';


class ConfigDisplay extends React.Component{
  /**
   * props:
   *   title: title of model
   *   model: model to display
   */
  render(){
    return <div>
      <h4>{this.props.title}</h4>
      {Object.keys(this.props.model).map((i)=>{
        return <div key={i}>
          <h6>{i}</h6>
          <span>{JSON.stringify(this.props.model[i])}</span>
        </div>;
      })}
      <div className="button-row">
        <button className="button-outline">
          Edit
        </button>
      </div>
    </div>;
  }
}

class ConfigEdit extends React.Component{
  render(){
    return <div>
      Config Edit
    </div>;
  }
}

class Config extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      error: false
    };
  }

  componentWillMount(){
    this.props.fetchAllConfigs();
  }

  render(){
    const configlist = ['navigation'];
    return <div>
      <h1>Config</h1>
      {!this.props.config.loading && <div className="button-row">
        <button className="button-outline"
          onClick={()=>{
            this.props.fetchAllConfigs();
          }}>Refresh</button>
      </div>}
      {(!this.props.config.loading && !this.props.config.failed) && this.props.config.content &&
        <div>
          {!this.state.edit && Object.keys(this.props.config.content).map((i)=>{
            return <ConfigDisplay key={i} title={i} model={this.props.config.content[i]}/>
          })}
        </div>
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
    fetchAllConfigs: ()=>{
      dispatch(fetchAllConfigsAction(CONFIG.retrieve('baseConfigUrl'), ['navigation']));
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
