import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function() {
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Meteor.Error('invalid-arguements', 'a and b must be number.');
    }
    return a + b;
  }
});
