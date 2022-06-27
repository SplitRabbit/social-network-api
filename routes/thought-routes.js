const router = require('express').Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../controllers/thought-controller');

// /api/Thoughts
router
  .route('/')
  .get(getAllThought)
  .post(createThought)
  .post(addReaction);

// /api/Thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)
  .delete(deleteReaction);

module.exports = router;
