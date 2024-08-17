require('dotenv').config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken');

// Function to sign JWT with email and secret
const jwtSign = (email) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET environment variable is not set.');
  }

  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = { jwtSign };