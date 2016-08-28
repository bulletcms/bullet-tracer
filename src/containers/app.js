import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'config';
import {fetchConfigAction} from 'reducers/actions';
import {makeGetNav} from 'reducers/selectors';

import 'bullet-flash';
import 'styles/app.scss';


class App extends React.Component {
  componentWillMount(){
    this.props.fetchConfig();
  }

  render(){
    return <div>
      {this.props.loading}
      {this.props.failed}
      {JSON.stringify(this.props.navContent, null, 2)}
      {this.props.children}
    </div>;
  }
}

const makeMapStateToProps = ()=>{
  const getNav = makeGetNav();
  return (state)=>{
    return getNav(state);
  };
};

const mapDispatchToProps = (dispatch, props)=>{
  return {
    fetchConfig: ()=>{
      dispatch(fetchConfigAction(CONFIG.retrieve('baseConfigUrl')));
    }
  };
};

App = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(App);

export {App};
