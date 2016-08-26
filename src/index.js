import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {CONFIG} from 'config';
import {store} from 'reducers';
import {routes} from 'routes';


class Tracer {
  constructor(config){
    for(let i in config){
      CONFIG.register(i, config[i]);
    }
  }

  render(){
    render(<Provider store={store}>
      {routes}
    </Provider>, document.getElementById('mount'));
  }
}

export {Tracer};
