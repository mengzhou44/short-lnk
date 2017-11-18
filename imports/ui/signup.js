import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();
    if (password.length < 4) {
      return this.setState({
        error: 'Password must be at least 4 characters long.'
      });
    }

    Accounts.createUser({ email, password }, error => {
      console.log('error', error);
      if (error) {
        this.setState({
          error: error.reason
        });
      } else {
        this.setState({
          error: ''
        });
      }
    });
  }
  render() {
    return (
      <div>
        <h2>Sign up </h2>
        <p className="error"> {this.state.error ? this.state.error : ''} </p>
        <form onSubmit={this.handleSubmit.bind(this)} noValidate>
          <div>
            <input type="email" name="email" ref="email" placeholder="Your Email Address" />
          </div>
          <div>
            <input type="password" name="password" ref="password" placeholder="Your Password" />
          </div>

          <button type="submit"> Create Account </button>
        </form>
        <Link to="/"> Already have an account? </Link>
      </div>
    );
  }
}
