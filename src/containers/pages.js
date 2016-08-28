import React from 'react';
import {connect} from 'react-redux';
import {interpreter} from 'bullet-mark';

import {CONFIG} from 'config';
import {fetchPageAction} from 'reducers/actions';
import {makeGetPage, getPageId} from 'reducers/selectors';
import {Section} from 'views';
import views from 'views';

import {Header} from 'views'; // temporary

class Pages extends React.Component{
  componentWillMount(){
    this.props.fetchPage();
  }

  render(){
    if(this.props.loading){
      return <Section><h1>loading</h1></Section>;
    } else if(this.props.failed){
      return <Section><h1>404 <br/> <small>does not exist</small></h1></Section>;
    } else {
      return <div>
        <Header background="https://c7.staticflickr.com/9/8759/28095871902_3d9a49bfff_k.jpg">
          <h1>Welcome home, <br/> <small>Kevin</small></h1>
        </Header>
        <Section>
          {interpreter(this.props.content, views)}
        </Section>
      </div>;
    }
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
    fetchPage: ()=>{
      dispatch(fetchPageAction(CONFIG.retrieve('basePagesUrl'), getPageId(null, props)));
    }
  };
};

Pages = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Pages);

export {Pages};
