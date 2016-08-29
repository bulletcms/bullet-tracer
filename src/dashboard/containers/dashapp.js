import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'config';
import {Navbar} from 'views';

import 'bullet-flash';
import 'styles/app.scss';


class DashApp extends React.Component {
  componentWillMount(){
    // this.props.fetchConfig();
  }

  render(){
    return <div>
      {this.props.children}
    </div>;
  }
}

// const makeMapStateToProps = ()=>{
//   const getNav = makeGetNav();
//   return (state)=>{
//     return getNav(state);
//   };
// };
//
// const mapDispatchToProps = (dispatch, props)=>{
//   return {
//     fetchConfig: ()=>{
//       dispatch(fetchConfigAction(CONFIG.retrieve('baseConfigUrl')));
//     }
//   };
// };
//
// App = connect(
//   makeMapStateToProps,
//   mapDispatchToProps
// )(App);

export {DashApp};
