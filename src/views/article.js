import React from 'react';
import Moment from 'moment';


class Article extends React.Component{
  /**
   * props:
   *   title: string
   *   author: string
   *   date: unixtime
   */
  render(){
    const date = new Date(this.props.date);
    return <article>
      <h2>{this.props.title} <br/> <small>By {this.props.author} | <span title={date.toString()}>{Moment(this.props.date).fromNow()}</span></small></h2>
      {this.props.children}
    </article>;
  }
}


export {Article};
