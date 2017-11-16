import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Login from '../imports/ui/login';
import Signup from '../imports/ui/signup';
import Link from '../imports/ui/link';
import NotFound from '../imports/ui/not-found';

Meteor.startup(() => {
  let routes = (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/links" component={Link} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );

  ReactDOM.render(routes, document.getElementById('app'));
});
