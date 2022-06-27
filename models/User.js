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

// get total count of comments and replies on retrieval
UserSchema.virtual('friendcount').get(function() {
  return this.friends.reduce(
    (total, friends) => total + comment.replies.length + 1,
    0
  );
});

const User = model('User', PizzaSchema);

module.exports = User;
