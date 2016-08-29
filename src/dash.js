import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {CONFIG} from 'dashboard/config';
import {store} from 'dashboard/reducers';
import {routes} from 'dashboard/routes';

class Dashboard {
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

export {Dashboard};
