require('dotenv').config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken');

// Function to sign JWT with email and secret
const jwtSign = (email) => {
  if (!process.env.SECRET_ACCESS_TOKEN) {
    throw new Error('SECRET_ACCESS_TOKEN environment variable is not set.');
  }

  return jwt.sign({ email }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '7d' });
};

module.exports = { jwtSign };