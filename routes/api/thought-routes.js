const router = require('express').Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/Thoughts
router
  .route('/')
  .get(getAllThought)
  .post(createThought)

// /api/Thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

// /api/Thoughts/:id/reactions
router
  .route('/:id/reactions')
  .post(addReaction)

router
  .route('/:id/reactions/:routerid')
  .delete(deleteReaction);

module.exports = router;
