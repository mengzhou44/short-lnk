import React, { Component } from 'react';
import { Acocunts } from 'meteor/accounts-base';
import ReactDOM from 'react-dom';
import { Links } from '../api/links';

export default class Link extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const url = this.refs.url.value.trim();
    if (url) {
      Links.insert({ url });
      this.refs.url.value = '';
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => Accounts.logout()}>Log out</button>
        <p>Links</p>

        <p>Add Links </p>
        <form onSubmit={this.handleSubmit.bind(this)} noValidate>
          <input ref="url" type="text" placeholde="URL" />
          <button type="submit">Add </button>
        </form>
      </div>
    );
  }
}
