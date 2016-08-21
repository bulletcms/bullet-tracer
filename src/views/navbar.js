import React from 'react';

import {hashCode} from 'utility';


class Navbar extends React.Component{
  /**
   * props:
   *   brand: image url and link url tuple
   *   list: array of string url tuples
   *   listRight: array of string url tuples
   */
  render(){
    return <nav>
      <div class="nav-spacer"></div>
      <div class="nav-container">
        <div class="container">
          <div class="brand brand-padded"><a href={this.props.brand[1]}><img src={this.props.brand[0]}/></a></div>
          <ul class="nav-list">
            {this.props.list.map((i)=>{
              return <li key={hashCode(i[0]+i[1])}>
                <a href={i[1]}>{i[0]}</a>
              </li>;
            })}
          </ul>
          <ul class="nav-list right">
            {this.props.listRight.map((i)=>{
              return <li key={hashCode(i[0]+i[1])}>
                <a href={i[1]}>{i[0]}</a>
              </li>;
            })}
          </ul>
        </div>
      </div>
    </nav>;
  }
}

export {Navbar};
