import React from 'react';


class PageHeader extends React.Component{
  /**
   * props:
   *   title: string
   */
  render(){
    return <div className="page-header">
      {this.props.children}
    </div>;
  }
}

export {PageHeader};
