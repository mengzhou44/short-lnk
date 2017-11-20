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
      <div className="box-view">
        <div className="box-view__box">
          <h1> Short Lnk </h1>
          <p className="error"> {this.state.error ? this.state.error : ''} </p>
          <form onSubmit={this.handleSubmit.bind(this)} noValidate className="box-view__form">
            <input type="email" name="email" ref="email" placeholder="Your Email Address" />

            <input type="password" name="password" ref="password" placeholder="Your Password" />

            <button type="submit" className="button">
              Login
            </button>
          </form>

          <Link to="/signup"> Create an account? </Link>
        </div>
      </div>
    );
  }
}
