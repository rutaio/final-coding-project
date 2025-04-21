const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// postman returns a server error, but it creates a user in mongo..
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = new User({
      name,
      email,
      password,
    });

    user.save();

    const token = jwt.sign({ userId: user._id }.process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res
      .status(201)
      .json({ access_token: token, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// if a POST request is used on postman at login, it returns access token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    );

    res
      .status(201)
      .json({ access_token: token, message: 'User logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// if a GET request is used on postman at /auth/user/id, it returns error 404
// am I testing in a wrong way?
exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
