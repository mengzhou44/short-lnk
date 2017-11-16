import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
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
    console.log('email', email);
    Accounts.createUser({ email, password }, error => {
      console.log('Singup call back!');
    });
  }
  render() {
    return (
      <div>
        <h2>Sign up </h2>
        <p> {this.state.error ? this.state.error : ''} </p>
        <form onSubmit={this.handleSubmit.bind(this)}>
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
