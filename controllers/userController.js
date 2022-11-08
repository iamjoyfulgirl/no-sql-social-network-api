const { User, Thought, Reaction } = require('../models');

// User API route

module.exports = {

  getUsers: async (req, res, next) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log('Error:', err);
      res.json(err);
    }
  },
  getSingleUser: async (req, res, next) => {
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
  createUser: async (req, res, next) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json(err);
    };
  },
  updateUser: async (req, res, next) => {
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

  // Deletes user's thoughts when the user is deleted
  deleteUser: async (req, res, next) => {
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

  // friends API 
  addFriend: async (req, res, next) => {
    try {
      const newFriend = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { friends: req.params.friendId } },
        { new: true },
      );
      if (!newFriend) {
        res.status(404).json({ message: 'No user with that ID' });
      } else {
        res.json('New friend added 🎉');
      };
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json(err);
    };
  },
  deleteFriend: async (req, res, next) => {
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