const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        //Must be between 1 and 280 characters
      },
    createdAt: {
      type: Date,
      default: Date.now
      //Use a getter method to format the timestamp on query
    },
    Thoughtname: {
      type: String,
      required: true
    },
    //Array of nested documents created with the reactionSchema
    reactions: [      
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [      
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
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
ThoughtSchema.virtual('friendcount').get(function() {
    return this.friends.reduce(
      (total, friend) => total + friend.replies.length + 1,
      0
    );
  });

module.exports = Thought;
