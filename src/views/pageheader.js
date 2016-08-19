import React from 'react';


class PageHeader extends React.Component{
  /**
   * props:
   *   title: string
   */
  render(){
    return <div className="page-header">
      <h1>{this.props.title}</h1>
    </div>;
  }
}

export {PageHeader};
