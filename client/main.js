import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { routes, onAuthChange } from '../imports/routes/routes';
import { Links } from '../imports/api/links';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
  Meteor.subscribe('links');
});

Meteor.startup(() => {
  Meteor.call('add', 3, 5, (err, res) => {
    if (err) {
      console.log(err.reason);
    } else {
      console.log(res);
    }
  });
  ReactDOM.render(routes, document.getElementById('app'));
});
