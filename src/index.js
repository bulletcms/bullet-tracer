import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {store} from 'reducers';
import {routes} from 'routes';


class Tracer {
  render(){
    render(<Provider store={store}>
      {routes}
    </Provider>, document.getElementById('mount'));
  }
}

export {Tracer};
