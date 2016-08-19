import React from 'react';


class Section extends React.Component{
  render(){
    return <section>
      <div className="container">
        {this.props.children}
      </div>
    </section>;
  }
}

export {Section};
