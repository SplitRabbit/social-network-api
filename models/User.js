const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    thoughts: [      
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [      
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of friends
ThoughtsSchema.virtual('reactionCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
