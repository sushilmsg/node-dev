// getting-started.js
const mongoose = require('mongoose');

const connectdb = async () =>{
  await mongoose.connect('mongodb://127.0.0.1:27017/node_dev');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = connectdb;

