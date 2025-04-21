// const Messages = require('../models/messagesModel');

// GET is a response from the backend:
//const getMessages = (req, res) => {
//  res.status(201).json(Messages.getMessages());
//};

// POST request - a human is asking to send this message to the owner of the website:
// const createMessage = (req, res) => {
//  try {
//    const { name, email, message } = req.body;

//   if (!name) {
//     res.status(400).json({ error: 'Name is required!' });
//  }

//   if (!email) {
//     res.status(400).json({ error: 'Email is required!' });
//   }

//   if (!message) {
//     res.status(400).json({ error: 'Message is required!' });
//  }

//   Messages.createMessage({ name, email, message });
//   res.status(201).json({ message: 'Message is sent successfully!' });
// } catch (error) {
//    res.status(500).json({ error: 'Internal server error' });
//  }
//};

//module.exports = {
// getMessages,
// createMessage,
// };

const Message = require('../models/messagesModel');

// works on postman
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// postman shows a correct status message
exports.createMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ message: 'Message registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
