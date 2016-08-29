import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'dashboard/config';


class Home extends React.Component {
  componentWillMount(){
    // this.props.fetchConfig();
  }

  render(){
    return <div>
      <h1>Home</h1>
      Hello World!
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

export {Home};
