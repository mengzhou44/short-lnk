import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default () => {
  return (
    <div className="box-view">
      <div className="box-view__box">
        <h1>Page Not Found </h1>
        <p> We are not able to find this page </p>
        <Link to="/" className="button button--link">
          {' '}
          Head Home{' '}
        </Link>
      </div>
    </div>
  );
};
