import {h, Component} from 'preact';
import Router from 'preact-router';

import {Pages} from './pages';
import {DNE} from './dne';

import 'styles/app.scss';


class App extends Component {
  render(){
    return <Router>
      <div path="/1/:wildcard?">
        <div>1-wildcard</div>
        <Router>
          <div path="/:wildcard/a">One A</div>
          <div path="/:wildcard/b">One B</div>
        </Router>
      </div>
      <Pages path="/" />
      <Pages path="/:pageid" />
      <DNE default />
    </Router>;
  }
}

export {App};
