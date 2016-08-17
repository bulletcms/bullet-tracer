import {h, Component} from 'preact';
import Router from 'preact-router';

import {Pages} from './pages';

import 'styles/app.scss';


class App extends Component {
  render(){
    return <Router>
      <Pages path="/" />
      <Pages path="/:pageid" />
    </Router>;
  }
}

export {App};
