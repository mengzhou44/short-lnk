import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

class Link extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.history.push('/')}>Logout </button>

        <p>Link component here </p>
      </div>
    );
  }
}

export default withRouter(Link);
