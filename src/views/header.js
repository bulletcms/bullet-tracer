import React from 'react';
import 'styles/header.scss';

class Header extends React.Component{
  /**
   * props:
   *   background: url for image
   *   opacity: float from 0 to 1
   */
  render(){
    let headerBackgroundStyle = {};
    let headerStyle = {};
    let headerClassName = '';
    if(this.props.background){
      headerBackgroundStyle = {
        'background': `url(${this.props.background}) no-repeat center center fixed`,
        'WebkitBackgroundSize': 'cover',
        'MozBackgroundSize': 'cover',
        'OBackgroundSize': 'cover',
        'backgroundSize': 'cover'
      };
      headerClassName = 'full-header';
      headerStyle = {
        'background': `rgba(0, 0, 0, ${this.props.opacity || 0.12})`
      };
    }
    return <div style={headerBackgroundStyle}>
      <header className={headerClassName} style={headerStyle}>
        <div className="container header-child">
          {this.props.children}
        </div>
        {this.props.background && <div className="downIcon">
          <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </div>}
      </header>
    </div>;
  }
}

export {Header};
