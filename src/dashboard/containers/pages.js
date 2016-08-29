import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'dashboard/config';


class Pages extends React.Component {
  componentWillMount(){
    // this.props.fetchConfig();
  }

  render(){
    console.log('i am rendering');
    return <div>
      <h1>Pages</h1>
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

export {Pages};
