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
    const time = Moment(this.props.date);
    return <article>
      <h2>{this.props.title} <br/> <small>By {this.props.author} | <span title={time.format()}>{time.fromNow()}</span></small></h2>
      {this.props.children}
    </article>;
  }
}


export {Article};
