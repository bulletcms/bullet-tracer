import React from 'react';


class Pages extends React.Component{
  render(){
    const {params, location} = this.props;
    const {pageid} = params;
    const pageroute = (location.pathname == '/') ? 'indexroute' : pageid;
    return <div>{pageroute}</div>;
  }
}

export {Pages};
