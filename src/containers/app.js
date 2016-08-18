import React from 'react';

import {Pages} from './pages';
import {DNE} from './dne';

import 'bullet-flash';
import 'styles/app.scss';


class App extends React.Component {
  render(){
    return <div>
      {this.props.children}
    </div>;
  }
}

export {App};
