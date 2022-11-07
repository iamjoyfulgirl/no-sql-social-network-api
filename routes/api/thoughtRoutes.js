const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtsController');

// GET thoughts API
router.route('/').get(getThoughts).all(createThought);

// GET/UPDATE/DELETE thoughts by id 
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// POST reactions on a thought by id
router.route(`/:thoughtId/reactions`).post(addReaction);

// DELETE reactions a thought by id
router.route(`/:thoughtId/reactions/:reactionId`).delete(deleteReaction);

module.exports = router;