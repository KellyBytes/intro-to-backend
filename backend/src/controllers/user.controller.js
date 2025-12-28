import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // basic validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'All fields need to be filled!',
      });
    }

    // check if user exists already
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // create user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: 'User registered',
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // check if the user already exists
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user)
      return res.status(400).json({
        message: 'User not found',
      });

    // compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({
        message: 'Invalid credentials',
      });

    res.status(200).json({
      message: 'User logged in',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user)
      return res.status(404).json({
        message: 'User not found',
      });

    res.status(200).json({
      message: 'Logout successful',
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};

export { registerUser, loginUser, logoutUser };
