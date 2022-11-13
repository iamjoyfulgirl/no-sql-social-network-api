const { User, Thought } = require('../models');

// User API route

module.exports = {

  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log('Error:', err);
      res.json(err);
    }
  },
  getSingleUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (err) {
      console.log('Error:', err);
      res.json(err);
    };
  },
  // create user
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json(err);
    };
  },
  // update user
  updateUser: async (req, res) => {
    try {
      const update = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true },
      );
      if (!update) {
        res.status(404).json({ message: 'No user with this ID!' });
      } else {
        res.json(update);
      };
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json(err);
    };
  },

  // delete user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).clone();
      const deleteUserThoughts = Thought.deleteMany({
        "_id": {
          $in: user.thoughts,
        },
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        await user.deleteOne();
        res.json({ message: 'User deleted' });
      };
    } catch (err) {
      console.log('Error:', err);
      res.json(err);
    };
  },
  // add friend
  addFriend: async (req, res) => {
    try {
      const newFriend = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { friends: req.params.friendId } },
        { new: true },
      );
      if (!newFriend) {
        res.status(404).json({ message: 'No user with that ID' });
      } else {
        res.json('New friend added');
      };
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json(err);
    };
  },
  // delete friend
  deleteFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $pull: { friends: req.params.friendId } },
      );
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'Friend deleted' });
      };
    } catch (err) {
      console.log('Error:', err);
      res.json(err);
    };
  },
};