import 'babel-polyfill';
import 'whatwg-fetch';
import {h, render, Component} from 'preact';
import 'app.scss';

class App extends Component {
  render(){
    return <span>Hello World!</span>;
  }
}

class Tracer {
  render(){
    render(<App/>, document.getElementById('mount'));
  }
}

export {Tracer};
