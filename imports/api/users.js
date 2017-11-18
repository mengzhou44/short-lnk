import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

Accounts.validateNewUser(user => {
  try {
    const email = user.emails[0].address;
    const userSchema = new SimpleSchema({
      email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
      }
    });

    userSchema.validate({ email });
  } catch (e) {
    throw new Meteor.Error(400, e.message);
    return false;
  }

  return true;
});
