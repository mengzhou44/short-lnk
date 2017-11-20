import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';

import { Links } from '../api/links';
import PrivateHeader from './private-header';
import AddLink from './add-link';
import LinkListItem from './link-list-item';

export default class Link extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showVisible: true,
      links: []
    };
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      this.setState({
        links: Links.find({ visible: this.state.showVisible }).fetch()
      });
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderLink(link) {
    return <LinkListItem key={link._id} link={link} />;
  }

  render() {
    console.log('this.state.links', this.state.links);
    return (
      <div>
        <PrivateHeader title="Links" />
        <label>
          <input
            type="checkbox"
            check={this.state.showVisible}
            onChange={e => {
              const showVisible = !this.state.showVisible;
              this.setState({
                showVisible,
                links: Links.find({ visible: showVisible }).fetch()
              });
            }}
          />
          Show Hidden Links
        </label>
        <AddLink />

        {this.state.links.map(this.renderLink)}
      </div>
    );
  }
}
