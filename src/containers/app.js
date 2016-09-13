import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'config';
import {fetchConfigAction} from 'reducers/actions';
import {makeGetNav} from 'reducers/selectors';
import {Navbar} from 'views';

import 'bullet-flash';
import 'styles/app.scss';


class App extends React.Component {
  componentWillMount(){
    this.props.fetchConfig();
  }

  render(){
    return <div>
      {!(this.props.loading || this.props.failed) && this.props.navContent &&
        <Navbar brand={this.props.navContent.brand} list={this.props.navContent.list} listRight={this.props.navContent.listRight}/>}
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
