import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends Component {
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

    Meteor.loginWithPassword({ email }, password, error => {
      if (error) {
        this.setState({
          error
        });
      } else {
        console.log('login successful!');
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.error ? <p> {this.state.error}</p> : undefined}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <input type="email" name="email" ref="email" placeholder="Your Email Address" />
          </div>
          <div>
            <input type="password" name="password" ref="password" placeholder="Your Password" />
          </div>

          <button type="submit"> Login </button>
        </form>

        <Link to="/singup"> Create an account? </Link>
      </div>
    );
  }
}
