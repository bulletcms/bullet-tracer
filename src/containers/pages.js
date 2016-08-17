import React from 'react';


class Pages extends React.Component{
  render(){
    console.log(this.props);
    const {params} = this.props;
    const {pageid} = params;
    const pageroute = pageid || 'indexroute';
    return <div>{pageroute}</div>;
  }
}

export {Pages};
