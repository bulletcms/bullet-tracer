import React from 'react';
import {Router, Route, IndexRoute, Redirect, hashHistory} from 'react-router';

import {DashApp, Home, Pages, Config, User} from 'dashboard/containers';
import {Dne} from 'containers';


const routes = <Router history={hashHistory}>
  <Route path="/" component={DashApp}>
    <IndexRoute component={Home}/>
    <Route path="/pages" component={Pages}/>
    <Route path="/config" component={Config}/>
    <Route path="/users" component={User}/>
    <Route path="/404" component={Dne}/>
    <Redirect from="*" to="/404" />
  </Route>
</Router>;

export {routes};
