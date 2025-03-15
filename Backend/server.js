const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://kazishakkhar04:ZkoZBplIfAJvIo40@cluster0.khwct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB Atlas...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

// Your routes and server setup here...
//