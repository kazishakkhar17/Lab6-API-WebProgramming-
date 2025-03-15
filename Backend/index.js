const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving users."
    });
  }
});

mongoose.connect("mongodb+srv://kazishakkhar04:ZkoZBplIfAJvIo40@cluster0.khwct.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log('Error:', err);
  });
