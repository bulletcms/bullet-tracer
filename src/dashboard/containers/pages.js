import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'dashboard/config';
import {makeGetPage, makeGetPagelist} from 'dashboard/reducers/selectors';


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

const makeMapStateToProps = ()=>{
  const getPage = makeGetPage();
  const getPagelist = makeGetPagelist();
  return (state)=>{
    return {
      page: getPage(state),
      pagelist: getPagelist(state)
    };
  };
};

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
