const Message = require('../models/messageModel');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error in getting all the messages' });
  }
};

// POST request - a human is asking the server to send this message through Contact page:
exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // checking all missing fields at once:
    const missingFields = [];
    if (!name) missingFields.push('Name');
    if (!email) missingFields.push('Email');
    if (!message) missingFields.push('Message');

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `The following fields are required: ${missingFields.join(', ')}`,
      });
    }

    // check if entered email matches email's format:
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      return res.status(400).json({
        error: 'Please enter a valid email address.',
      });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({
      msg: 'Contact message sent successfully',
      data: newMessage,
    });
  } catch (error) {
    // Always log full error to the terminal:
    console.error('Error creating message:', error);

    // Return clean error message to frontend:
    res.status(500).json({
      error: 'Something went wrong. Please try again later.',
    });
  }
};
