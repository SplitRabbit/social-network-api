const { Schema, model, Types } = require('mongoose');
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
    reactions: [ReactionSchema]
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

const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true,
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

// get total count of comments and replies on retrieval
ThoughtSchema.virtual('reactioncount').get(function() {
    return this.reactions.reduce(
      (total, reaction) => total + reaction.replies.length + 1,
      0
    );
  });

const Thought = model('Thought', PizzaSchema);

module.exports = Thought;
