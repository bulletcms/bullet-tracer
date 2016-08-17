import {h, Component} from 'preact';


class Pages extends Component{
  render(props, state){
    const {url, pageid} = props;
    const pageroute = (url == '/') ? 'indexroute' : pageid;
    return <div>{pageroute}</div>;
  }
}

export {Pages};
