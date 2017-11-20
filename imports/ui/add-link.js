import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';
import { Links } from '../api/links';

export default class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      error: '',
      isOpen: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.url) {
      Meteor.call('links.insert', this.state.url, (err, res) => {
        if (err) {
          this.setState({ error: err.reason });
        } else {
          this.handleModalClose();
        }
      });
    }
  }

  handleModalClose() {
    this.setState({ isOpen: false, url: '', error: '' });
  }

  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({ isOpen: true })}>
          {' '}
          + Add Link{' '}
        </button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
        >
          <p>Add Links </p>
          {this.state.error ? <p> {this.state.error} </p> : undefined}
          <form onSubmit={this.handleSubmit.bind(this)} noValidate>
            <input
              type="text"
              placeholde="URL"
              ref="url"
              value={this.state.url}
              onChange={e =>
                this.setState({
                  url: e.target.value
                })}
            />
            <button type="submit">Add </button>
            <button onClick={this.handleModalClose.bind(this)}>Close </button>
          </form>
        </Modal>
      </div>
    );
  }
}
