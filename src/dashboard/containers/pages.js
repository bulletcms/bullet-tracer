import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'dashboard/config';


class Pages extends React.Component {
  componentWillMount(){
    // this.props.fetchConfig();
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   return getPageId(null, nextProps) !== getPageId(null, this.props) || nextProps.content !== this.props.content;
  // }
  //
  // componentWillUpdate(nextProps){
  //   this.props.fetchPage(nextProps);
  // }

  render(){
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
