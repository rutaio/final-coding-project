const fs = require('fs');
const filePath = './database/messages.json';
const { v4: uuidv4 } = require('uuid');

// GET:
const getMessages = () => {
  const data = fs.readFileSync(filePath);

  return JSON.parse(data);
};

// POST:
// we receive an object, which was sent at Controller:
const createMessage = (messageData) => {
  const messages = getMessages();

  // we create a new message with what a user sent us:
  const newMessage = {
    id: uuidv4(),
    ...messageData,
    date: new Date().toISOString(),
  };

  // we add this message to all messages in our DB:
  messages.push(newMessage);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
  return newMessage;
};

module.exports = {
  getMessages,
  createMessage,
};
