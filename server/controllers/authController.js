const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users } = require('../models/User'); // Убедитесь, что путь правильный

const register = async (req, res) => {
  const { username, password, role } = req.body;

  const userExists = users.find(u => u.username === username);
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword, role });

  res.status(201).json({ message: 'User registered' });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};

module.exports = { register, login };
