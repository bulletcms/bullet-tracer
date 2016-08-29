import React from 'react';
import {Link} from 'react-router';

import {Grid} from './grid';
import {hashCode} from 'utility';


class Sidebar extends React.Component{
  /**
   * props:
   *   title: string
   *   list: array of string url tuples
   */
  render(){
    return <aside>
      {this.props.title &&
        <div className="title">
          <h2>{this.props.title}</h2>
        </div>
      }
      <ul className="list">
        {this.props.list.map((i)=>{
          return <li className="list-item" key={hashCode(i[0]+i[1])}>
            <Link to={i[1]}>{i[0]}</Link>
          </li>;
        })}
      </ul>
    </aside>;
  }
}

class SidebarCounter extends React.Component{
  render(){
    return <div className="counter-aside">
      {this.props.children}
    </div>;
  }
}

class SidebarLayout extends React.Component{
  /**
   * props:
   *   title: string
   *   list: array of string url tuples
   */
  render(){
    return <Grid strict={true} vstretch={true}>
      <Sidebar title={this.props.title} list={this.props.list}/>
      <SidebarCounter>
        {this.props.children}
      </SidebarCounter>
    </Grid>
  }
}

export {Sidebar, SidebarCounter, SidebarLayout};
