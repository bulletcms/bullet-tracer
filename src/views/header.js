import React from 'react';
import 'styles/header.scss';

class Header extends React.Component{
  render(){
    return <header>
      <div className="container header-child">
        {this.props.children}
      </div>
      <div className="downIcon">
        <i className="fa fa-chevron-down" aria-hidden="true"></i>
      </div>
    </header>;
  }
}

export {Header};
