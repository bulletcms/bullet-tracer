import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'dashboard/config';
import {fetchPageAction, fetchPagelistAction} from 'dashboard/reducers/actions';
import {makeGetPage, makeGetPagelist} from 'dashboard/reducers/selectors';


class Pages extends React.Component {
  componentWillMount(){
    this.props.fetchPagelist();
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
      {JSON.stringify(this.props.pagelist)}
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

const mapDispatchToProps = (dispatch)=>{
  return {
    fetchPage: (pageid, method=false, body=false)=>{
      dispatch(fetchPageAction(CONFIG.retrieve('basePagesUrl'), pageid, method, body));
    },
    fetchPagelist: ()=>{
      dispatch(fetchPagelistAction(CONFIG.retrieve('basePagesUrl')));
    }
  };
};

Pages = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Pages);

export {Pages};
