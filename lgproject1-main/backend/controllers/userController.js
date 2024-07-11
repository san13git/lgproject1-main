const User = require('../models/User');


const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken'); // Optional: for generating JWT tokens

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Optional: Generate JWT token
    // const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', user /*, token */ });
  } catch (error) {
    console.error('Failed to login user:', error); // Log any errors encountered
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

  console.log('Received request:', req.body); // Log the received request body

  if (mobile.length !== 10) {
    return res.status(400).json({ error: 'Mobile number must be 10 digits.' });
  }

  const user = new User({ name, email, password, mobile });
  try {
    const savedUser = await user.save();
    console.log('User saved successfully:', savedUser); // Log the saved user details
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error('Failed to save user:', error); // Log any errors encountered
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser
};