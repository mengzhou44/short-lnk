import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Acocunts } from 'meteor/accounts-base';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';

import { Links } from '../api/links';

export default class Link extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: []
    };
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      this.setState({
        links: Links.find({}).fetch()
      });
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = this.refs.url.value.trim();
    if (url) {
      Links.insert({ url, userId: Meteor.userId() });
      this.refs.url.value = '';
    }
  }

  renderLink(link) {
    return <p key={link._id}>{link.url}</p>;
  }

  render() {
    return (
      <div>
        <button onClick={() => Accounts.logout()}>Log out</button>
        {this.state.links.map(this.renderLink)}

        <p>Add Links </p>
        <form onSubmit={this.handleSubmit.bind(this)} noValidate>
          <input ref="url" type="text" placeholde="URL" />
          <button type="submit">Add </button>
        </form>
      </div>
    );
  }
}
