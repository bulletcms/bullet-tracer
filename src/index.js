import 'babel-polyfill';
import 'whatwg-fetch';
import {h, render} from 'preact';
import {Provider} from 'preact-redux';

import {store} from 'reducers';
import {App} from 'containers';


class Tracer {
  render(){
    render(<Provider store={store}><App/></Provider>, document.getElementById('mount'));
  }
}

export {Tracer};
