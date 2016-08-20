import React from 'react';
import {Grid} from './grid';
import {hashCode} from './util';


class Sidebar extends React.Component{
  /**
   * props:
   *   title: string
   *   list: array of string url tuples
   */
  render(){
    return <aside>
      {this.props.title &&
        <div class="title">
          <h2>{this.props.title}</h2>
        </div>
      }
      <ul class="list">
        {this.props.list.map((i)=>{
          return <li className="list-item" key={hashCode(i[0]+i[1])}>
            <a href={i[1]}>{i[0]}</a>
          </li>;
        })}
      </ul>
    </aside>;
  }
}

class SidebarCounter extends React.Component{
  render(){
    return <div class="counter-aside">
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
