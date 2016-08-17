import {h, Component} from 'preact';


class DNE extends Component{
  render(props, state){
    const {url} = props;
    return <div>
      <h1>404</h1>
      <h4>{url} does not exist</h4>
    </div>;
  }
}

export {DNE};
