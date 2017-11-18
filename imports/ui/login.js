import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
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
          error: 'invalid email or password.'
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
        <p className="error"> {this.state.error ? this.state.error : ''} </p>
        <form onSubmit={this.handleSubmit.bind(this)} noValidate>
          <div>
            <input type="email" name="email" ref="email" placeholder="Your Email Address" />
          </div>
          <div>
            <input type="password" name="password" ref="password" placeholder="Your Password" />
          </div>

          <button type="submit"> Login </button>
        </form>

        <Link to="/signup"> Create an account? </Link>
      </div>
    );
  }
}
