import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { routes, onAuthChange } from '../imports/routes/routes';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
  Meteor.subscribe('links');
});

Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
});
