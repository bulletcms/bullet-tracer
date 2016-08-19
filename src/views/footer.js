import React from 'react';


class Footer extends React.Component{
  render(){
    return <footer>
      <div className="container">
        {this.props.children}
      </div>
    </footer>;
  }
}

export {Footer};
