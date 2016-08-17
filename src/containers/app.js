import React from 'react';

import {Pages} from './pages';
import {DNE} from './dne';

import 'styles/app.scss';


class App extends React.Component {
  render(){
    return <div>
      App Component
      {this.props.children}
      End App Component
    </div>;
  }
}

export {App};
