const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// in console, it works correctly, i.e. it redirects to login,
// BUT it does not show token in localStorage..

// in postman POST and GET request work correctly, it shows access token and returns the user
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

    // added code here:
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      access_token: token,
      // added code here:
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      message: 'User registered successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// in console, it does not work.. error with ProtectedRoute..
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

    res.status(201).json({
      access_token: token,
      // added code here:
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      message: 'User logged in successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.json(req.user); // user is attached by authMiddleware
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
