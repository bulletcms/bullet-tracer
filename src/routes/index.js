import React from 'react';
import {Router, Route, IndexRoute, Redirect, browserHistory} from 'react-router';

import {App, Pages, Dne} from 'containers';


const routes = <Router history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Pages}/>
    <Route path="/404" component={Dne}/>
    <Route path="/:pageid" component={Pages}/>
    <Redirect from="*" to="/404" />
  </Route>
</Router>;

export {routes};
