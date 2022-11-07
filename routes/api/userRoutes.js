const router = require('express').Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userController');

// GET user API
router.route('/').get(getUsers).all(createUser);

// GET/PUT/DELETE routes for user by userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// POST/DELETE ROUTE for friends by id
router.route('/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;