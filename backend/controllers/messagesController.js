const Messages = require('../models/messagesModel');

// GET is a response from the backend: 
const getMessages = (req, res) => {
  res.status(201).json(Messages.getMessages());
};

// POST request - a human is asking to send this message to the owner of the website:
const createMessage = (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name) {
      res.status(400).json({ error: 'Name is required!' });
    }

    if (!email) {
      res.status(400).json({ error: 'Email is required!' });
    }

    if (!message) {
      res.status(400).json({ error: 'Message is required!' });
    }

    Messages.createMessage({ name, email, message });
    res.status(201).json({ message: 'Message is sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getMessages,
  createMessage,
};
