import React from 'react';
import {connect} from 'react-redux';
import {parser, interpreter} from 'bullet-mark';

import {CONFIG} from 'config';
import {fetchPageAction} from 'reducers/actions';
import {makeGetPage, getPageId} from 'reducers/selectors';
import {Section} from 'views';
import views from 'views/indexlist';


class Pages extends React.Component{
  componentWillMount(){
    this.props.fetchPage();
  }

  shouldComponentUpdate(nextProps, nextState){
    return getPageId(null, nextProps) !== getPageId(null, this.props) || nextProps.content !== this.props.content;
  }

  componentWillUpdate(nextProps){
    this.props.fetchPage(nextProps);
  }

  render(){
    return <div>
      {this.props.loading && <Section><h1>loading</h1></Section>}
      {this.props.failed && <Section><h1>404 <br/> <small>does not exist</small></h1></Section>}
      {(!this.props.loading && !this.props.failed) && this.props.content && <div>{interpreter(parser(this.props.content), views)}</div>}
    </div>;
  }
}

const makeMapStateToProps = ()=>{
  const getPage = makeGetPage();
  return (state, props)=>{
    return getPage(state, props);
  };
};

const mapDispatchToProps = (dispatch, props)=>{
  return {
    fetchPage: (nextProps=false)=>{
      dispatch(fetchPageAction(CONFIG.retrieve('basePagesUrl'), getPageId(null, nextProps || props)));
    }
  };
};

Pages = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Pages);

export {Pages};
