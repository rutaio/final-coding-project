const fs = require('fs');
const filePath = './database/users.json';

// GET:
const getUsers = () => {
  const data = fs.readFileSync(filePath);

  return JSON.parse(data);
};

module.exports = {
  getUsers,
};
