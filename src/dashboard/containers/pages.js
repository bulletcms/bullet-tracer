import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import {parser} from 'bullet-mark';

import {CONFIG} from 'dashboard/config';
import {fetchPageAction, fetchPagelistAction} from 'dashboard/reducers/actions';
import {makeGetPage, makeGetPagelist} from 'dashboard/reducers/selectors';
import {Input, Textarea} from 'views';

const h = React.createElement;


class PageDisplay extends React.Component {
  /**
   * props:
   *  edit: function
   */
  render(){
    return <div>
      <button className="button-outline-primary"
        onClick={()=>{
          if(this.props.edit){
            this.props.edit();
          }
        }}>Edit</button>
      <h6>pageid</h6>
      <span>{this.props.content.pageid}</span>
      <h6>title</h6>
      <span>{this.props.content.title}</span>
      <h6>tags</h6>
      <span>{this.props.content.tags.join(', ')}</span>
      <h6>content</h6>
      <pre>{this.props.content.content}</pre>
    </div>;
  }
}

class PageEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {data: Immutable.fromJS(this.props.content)};
  }

  /**
   * props:
   *  content: page object
   *  save: function - callback with data
   *  cancel: function
   */
  render(){
    return <div>
      <button className="button-outline"
        onClick={()=>{
          if(this.props.cancel){
            this.props.cancel();
          }
        }}>Cancel</button>
      <button className="button-primary"
        onClick={()=>{
          if(this.props.save){
            this.props.save(this.state.data.toJSON());
          }
        }}>Save</button>
      <Input label="pageid" value={this.state.data.get('pageid')}
        handleBlur={(value)=>{
          this.setState({data: this.state.data.set('pageid', value)});}}/>
      <Input label="title" value={this.state.data.get('title')}
        handleBlur={(value)=>{
          this.setState({data: this.state.data.set('title', value)});}}/>
      <Input label="tags" value={this.state.data.get('tags').join(', ')}
        handleBlur={(value)=>{
          this.setState({data: this.state.data.set('tags', value.split(/\s*,\s*/))});}}/>
      <Textarea label="content" rows={12} value={this.state.data.get('content')}
        handleBlur={(value)=>{
          this.setState({data: this.state.data.set('content', value)});}}/>
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

  validate(pageObject){
    const {pageid, title, tags, content} = pageObject;
    return true;
  }

  render(){
    const errStyle = {
      color: '#d50000',
      backgroundColor: 'rgba(213, 0, 0, 0.12)'
    };
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
          {!this.state.edit &&
            <PageDisplay content={this.props.page.content}
              edit={()=>{this.setState({edit: true});}}/>}
          {this.state.edit &&
            <PageEdit content={this.props.page.content}
              save={(data)=>{
                if(this.validate(data)){
                  parser(data);
                  this.setState({edit: false});
                  console.log(data);
                } else {  
                  this.setState({...this.state, error: err});
                }
              }}
              cancel={()=>{this.setState({edit: false});}}/>}
          {this.state.error &&
            <div style={errStyle}>
              <h6>{this.state.error.type}</h6>
              <span>{this.state.error.message}</span>
            </div>
          }
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
