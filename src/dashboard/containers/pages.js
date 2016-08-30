import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'dashboard/config';
import {fetchPageAction, fetchPagelistAction} from 'dashboard/reducers/actions';
import {makeGetPage, makeGetPagelist} from 'dashboard/reducers/selectors';


class Pages extends React.Component {
  componentWillMount(){
    this.props.fetchPagelist();
  }

  render(){
    return <div>
      <h1>Pages</h1>
      {this.props.pagelist.loading && <h2>loading</h2>}
      {this.props.pagelist.failed && <h2>failed</h2>}
      {(!this.props.pagelist.loading && !this.props.pagelist.failed) && this.props.pagelist.content &&
        <div>
          <ul className="tablist">
            <li>one</li>
            <li>two</li>
            <li>three</li>
          </ul>
        </div>
      }
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
