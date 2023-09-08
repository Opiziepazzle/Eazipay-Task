// src/db/index.js
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, connectionParams)
  .then(() => {
    console.log('DATABASE CONNECTION SET');
  })
  .catch((err) => {
    console.log(err);
  });

// Define your mongoose models for User, Product, and Order here
