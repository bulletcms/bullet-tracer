import React from 'react';
import {Link} from 'react-router';

import {hashCode} from 'utility';


class Navbar extends React.Component{
  /**
   * props:
   *   brand: image url and link url tuple
   *   list: array of string url tuples
   *   listRight: array of string url tuples
   */
  render(){
    return <nav className="docked">
      <div className="nav-spacer"></div>
      <div className="nav-container">
        <div className="container">
          <div className="brand brand-padded"><Link to={this.props.brand[1]}><img src={this.props.brand[0]}/></Link></div>
          <ul className="nav-list">
            {this.props.list.map((i)=>{
              return <li key={hashCode(i[0]+i[1])}>
                <Link to={i[1]}>{i[0]}</Link>
              </li>;
            })}
          </ul>
          <ul className="nav-list right">
            {this.props.listRight.map((i)=>{
              return <li key={hashCode(i[0]+i[1])}>
                <Link to={i[1]}>{i[0]}</Link>
              </li>;
            })}
          </ul>
        </div>
      </div>
    </nav>;
  }
}

export {Navbar};
