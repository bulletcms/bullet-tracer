import React from 'react';


class Header extends React.Component{
  render(){
    return <header>
      <div className="container">
        {this.props.children}
      </div>
    </header>;
  }
}

export {Header};
