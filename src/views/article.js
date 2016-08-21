import React from 'react';

import {hashCode} from 'utility';


class Article extends React.Component{
  /**
   * props:
   *   title: string
   *   paragraphs: array of strings
   */
  render(){
    return <article>
      <h2>{this.props.title}</h2>
      {this.props.paragraphs.map((i)=>{
        return <p key={hashCode(i)}>
          {i}
        </p>;
      })}
    </article>;
  }
}


export {Article};
