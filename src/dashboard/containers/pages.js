import React from 'react';
import {connect} from 'react-redux';

import {CONFIG} from 'dashboard/config';
import {fetchPageAction, fetchPagelistAction} from 'dashboard/reducers/actions';
import {makeGetPage, makeGetPagelist} from 'dashboard/reducers/selectors';
import {Input, Textarea} from 'views';

const h = React.createElement;


class PageDisplay extends React.Component {
  render(){
    return <div>
      <h4>pageid</h4>
      <span>{this.props.pageid}</span>
      <h4>title</h4>
      <span>{this.props.title}</span>
      <h4>tags</h4>
      <span>{this.props.tags.join(', ')}</span>
      <h4>content</h4>
      <pre>{this.props.content}</pre>
    </div>;
  }
}

class PageEdit extends React.Component {
  render(){
    return <div>
      <Input label="pageid" value={this.props.pageid} handleBlur={(value)=>{console.log(value);}}/>
      <Input label="title" value={this.props.title}/>
      <Input label="tags" value={this.props.tags.join(', ')}/>
      <Textarea label="content" rows={12} value={this.props.content}/>
    </div>;
  }
}

class Pages extends React.Component {
  constructor(props){
    super(props);
    this.state = {edit: false};
  }

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
              return <li onClick={()=>{this.setState({edit: false}); this.props.fetchPage(i);}} key={i}>{i}</li>;
            })}
          </ul>
        </div>
      }
      {this.props.page.loading && <h2>loading</h2>}
      {this.props.page.failed && <h2>failed</h2>}
      {(!this.props.page.loading && !this.props.page.failed) && this.props.page.content &&
        <div>
          <button className={!this.state.edit && 'button-outline-primary' || 'button-primary'}
            onClick={()=>{
              this.setState({edit: !this.state.edit});
            }}>{!this.state.edit && 'Edit' || 'Done'}</button>
          {!this.state.edit && h(PageDisplay, this.props.page.content)}
          {this.state.edit && h(PageEdit, this.props.page.content)}
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
