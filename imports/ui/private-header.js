import React from 'react';
import PropTypes from 'prop-types';
import { Acocunts } from 'meteor/accounts-base';

export default (PrivateHeader = props => {
  return (
    <div>
      <p>{props.title} </p>
      <button onClick={() => Accounts.logout()}>Log out</button>
    </div>
  );
});

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};
