import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'dashboard/config';
import {fetchPageAction, fetchPagelistAction} from 'dashboard/reducers/actions';
import {makeGetPage, makeGetPagelist} from 'dashboard/reducers/selectors';
import {Input, Textarea} from 'views';


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
            {this.props.pagelist.content.map((i)=>{
              return <li onClick={()=>{this.props.fetchPage(i)}} key={i}>{i}</li>;
            })}
          </ul>
        </div>
      }
      {this.props.page.loading && <h2>loading</h2>}
      {this.props.page.failed && <h2>failed</h2>}
      {(!this.props.page.loading && !this.props.page.failed) && this.props.page.content &&
        <div>
          <Input label="pageid" value={this.props.page.content.pageid} handleChange={(value)=>{console.log(value);}}/>
          <Input label="title" value={this.props.page.content.title}/>
          <Input label="tags" value={this.props.page.content.tags.join(', ')}/>
          <Textarea label="content" value={this.props.page.content.content}/>
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
