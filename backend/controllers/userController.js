const User = require('../models/userModel');

const getUsers = (req, res) => {
  res.json(User.getUsers());
};

module.exports = {
  getUsers,
};