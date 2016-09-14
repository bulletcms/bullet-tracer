import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import {parser} from 'bullet-mark';

import {CONFIG} from 'dashboard/config';
import {fetchPageAction, newPageAction, fetchPagelistAction} from 'dashboard/reducers/actions';
import {makeGetPage, getPageRequest, makeGetPagelist, getLogin, getLoginExpiresAt, getLoginValid} from 'dashboard/reducers/selectors';
import {Input, Textarea, Modal} from 'views';


class PageDisplay extends React.Component {
  /**
   * props:
   *  edit: function
   */
  render(){
    return <div>
      <div className="button-row">
        <button className="button-outline-primary"
          onClick={()=>{
            if(this.props.edit){
              this.props.edit();
            }
          }}>Edit</button>
      </div>
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
   *  error: page error object
   *  save: function - callback with data
   *  delete: function - callback with data
   *  check: function - callback with data
   *  cancel: function
   */
  render(){
    return <div>
      <div className="button-row">
        <button className="button-outline"
          onClick={()=>{
            if(this.props.cancel){
              this.props.cancel();
            }
          }}>Cancel</button>
        <button className="button-outline"
          onClick={()=>{
            if(this.props.check){
              this.props.check(this.state.data.toJSON());
            }
          }}>Check</button>
        <button className="button-primary"
          onClick={()=>{
            if(this.props.save){
              this.props.save(this.state.data.toJSON());
            }
          }}>Save</button>
        {this.props.delete && <button className="button-danger"
          onClick={()=>{
            if(this.props.delete){
              this.props.delete(this.state.data.toJSON());
            }
          }}>Delete</button>}
      </div>
      <Input label="pageid" value={this.state.data.get('pageid')} error={this.props.error.pageid}
        handleBlur={(value)=>{this.setState({data: this.state.data.set('pageid', value)});}}/>
      <Input label="title" value={this.state.data.get('title')} error={this.props.error.title}
        handleBlur={(value)=>{this.setState({data: this.state.data.set('title', value)});}}/>
      <Input label="tags" value={this.state.data.get('tags').join(', ')} error={this.props.error.tags}
        handleBlur={(value)=>{this.setState({data: this.state.data.set('tags', value.split(/\s*,\s*/))});}}/>
      <Textarea label="content" rows={12} value={this.state.data.get('content')}
        handleBlur={(value)=>{this.setState({data: this.state.data.set('content', value)});}}/>
      {this.props.error.content &&
        <pre className="textarea-error">
          <h6>{this.props.error.content.type}</h6>
          <span>{this.props.error.content.message}</span>
        </pre>
      }
    </div>;
  }
}

const noerr = {'pageid': false, 'title': false, 'tags': false, 'content': false};

class Pages extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      error: {
        'pageid': false,
        'title': false,
        'tags': false,
        'content': false
      },
      newpage: false,
      confirmDelete: false,
      deleteId: false
    };
  }

  componentWillMount(){
    this.props.fetchPagelist();
  }

  validate(pageObject){
    const {pageid, title, tags, content} = pageObject;
    const error = {
      'pageid': false,
      'title': false,
      'tags': false,
      'content': false
    };
    let failed = false;
    if(!/^[a-z0-9]+$/.test(pageid)){
      error.pageid = 'must only contain a-z 0-9';
      failed = true;
    }
    if(!/^.+$/.test(title)){
      error.title = 'must not contain any newline characters';
      failed = true;
    }
    try {
      const k = JSON.parse(tags);
      if(!Array.isArray(k) || !(k.every((i)=>{return /^[a-z0-9]+$/.test(i);}))){
        error.tags = 'each tag must only contain a-z 0-9';
        failed = true;
      }
    } catch(err){
      error.tags = 'not valid JSON';
      failed = true;
    }
    try {
      parser(content);
    } catch(err){
      error.content = err;
      failed = true;
    }
    if(failed){
      return error;
    } else {
      return false;
    }
  }

  render(){
    return <div>
      <h1>Pages</h1>
      {this.props.pagelist.loading && <h2>loading</h2>}
      {this.props.pagelist.failed && <h2>failed</h2>}
      {(!this.props.pagelist.loading && !this.props.pagelist.failed) && this.props.pagelist.content &&
        <div>
          <div className="button-row">
            <button className="button-outline"
              onClick={()=>{this.props.fetchPagelist();}}>
              Refresh
            </button>
            <button className="button-outline-primary"
              onClick={()=>{this.props.newPage(); this.setState({...this.state, error: noerr, newpage: true, edit: true})}}>
              New Page
            </button>
          </div>
          <ul className="tablist">
            {this.props.pagelist.content.map((i)=>{
              return <li onClick={()=>{this.setState({...this.state, error: noerr, newpage: false, edit: false}); this.props.fetchPage(i);}} key={i}>{i}</li>;
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
              edit={()=>{this.setState({...this.state, edit: true});}}/>}
          {this.state.edit && !this.state.newpage &&
            <PageEdit content={this.props.page.content} error={this.state.error}
              save={(data)=>{
                const errs = this.validate(data);
                if(errs){
                  this.setState({...this.state, error: errs});
                } else {
                  this.setState({...this.state, error: noerr, edit: false});
                  if(this.props.logininfo && this.props.loginValid(this.props.loginExpiresAt)){
                    const {username, idToken} = this.props.logininfo;
                    this.props.fetchPage(data.pageid, 'PUT', {username, idToken, data});
                  }
                }
              }}
              check={(data)=>{
                const errs = this.validate(data);
                if(errs){
                  this.setState({...this.state, error: errs});
                } else {
                  this.setState({...this.state, error: noerr});
                }
              }}
              cancel={()=>{this.setState({...this.state, error: noerr, edit: false});}}
              delete={(data)=>{
                this.setState({...this.state, deleteId: data.pageid, confirmDelete: true});
              }}
            />
          }
          {this.state.edit && this.state.newpage &&
            <PageEdit content={this.props.page.content} error={this.state.error}
              save={(data)=>{
                const errs = this.validate(data);
                if(errs){
                  this.setState({...this.state, error: errs});
                } else {
                  this.setState({...this.state, error: noerr, edit: false});
                  if(this.props.logininfo && this.props.loginValid(this.props.loginExpiresAt)){
                    const {username, idToken} = this.props.logininfo;
                    this.props.fetchPage(data.pageid, 'POST', {username, idToken, data});
                  }
                }
              }}
              check={(data)=>{
                const errs = this.validate(data);
                if(errs){
                  this.setState({...this.state, error: errs});
                } else {
                  this.setState({...this.state, error: noerr});
                }
              }}
              cancel={()=>{this.setState({...this.state, error: noerr, edit: false});}}
            />
          }
        </div>
      }
      {this.props.request &&
        <pre className="request-status">
          {this.props.request.status && <span>request success for page: {this.props.request.pageid}</span>}
          {!this.props.request.status && <span>request failed for page: {this.props.request.pageid}</span>}
        </pre>
      }
      <Modal isOpen={this.state.confirmDelete}>
        <h1>Confirm Delete</h1>
        <h4>pageid: {this.state.deleteId}</h4>
        <div className="button-row">
          <button onClick={()=>{this.setState({...this.state, deleteId: false, confirmDelete: false});}}>Cancel</button>
          <button className="button-danger" onClick={()=>{
            if(this.props.logininfo && this.props.loginValid(this.props.loginExpiresAt)){
              const {username, idToken} = this.props.logininfo;
              this.props.fetchPage(this.state.deleteId, 'DELETE', {username, idToken, data: {pageid: this.state.deleteId}});
            }
            this.setState({...this.state, deleteId: false, confirmDelete: false});
          }}>Delete</button>
        </div>
      </Modal>
    </div>;
  }
}

const makeMapStateToProps = ()=>{
  const getPage = makeGetPage();
  const getPagelist = makeGetPagelist();
  return (state)=>{
    return {
      page: getPage(state),
      pagelist: getPagelist(state),
      logininfo: getLogin(state),
      loginExpiresAt: getLoginExpiresAt(state),
      request: getPageRequest(state)
    };
  };
};

const mapDispatchToProps = (dispatch)=>{
  return {
    fetchPage: (pageid, method=false, body=false)=>{
      dispatch(fetchPageAction(CONFIG.retrieve('basePagesUrl'), pageid, method, body));
    },
    newPage: ()=>{
      dispatch(newPageAction());
    },
    fetchPagelist: ()=>{
      dispatch(fetchPagelistAction(CONFIG.retrieve('basePagesUrl')));
    },
    loginValid: (time)=>{
      return getLoginValid(time);
    }
  };
};

Pages = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Pages);

export {Pages};
