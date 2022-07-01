// Require Thought and Users Models
const {Thought, User} = require('../models');

// Set up Thought Controller
const thoughtController = {

    // Create a new thought
    createThought({body}, res) {
        Thought.create(body)
        .then(({_id}) => {
             User.findOneAndUpdate({ _id: body.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err)); 
    },

    // Get all available Thought
    getAllThought(req,res) {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        // .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get a certain thought by ID
    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
            res.status(404).json({message: 'No Thought with this particular ID!'});
            return;
        }
        res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Update a current thought by ID
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No Thought with this particular ID!'});
                return;
            }
                res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // Delete a current thought by ID
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No Thought with this particular ID!'});
                return;
            }
            res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Add a new Reaction
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'No Thought with this particular ID!'});
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },

    // Delete a reaction by ID
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No Thought with this particular ID!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }

};

// Export module thought controller
module.exports = thoughtController;