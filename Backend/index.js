const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:3001', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type'
}));

app.use(express.json());

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
// POST route to add a new user
app.post('/api/users', async (req, res) => {
  const { idStudent, name, email, password, age, cgpa, department } = req.body;

  if (!idStudent || !department) {
    return res.status(400).send({ message: "idStudent and department are required" });
  }

  try {
    const newUser = new User({ idStudent, name, email, password, age, cgpa, department });
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while adding the user." });
  }
});

// PUT route to update a user
app.put('/api/users/:idStudent', async (req, res) => {
  const { idStudent } = req.params; 
  const { name, email, password, age, cgpa, department } = req.body;

  try {
    // Find the user by idStudent and update
    const updatedUser = await User.findOneAndUpdate(
      { idStudent }, // Use idStudent to search
      { name, email, password, age, cgpa, department }, // Fields to update
      { new: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while updating the user."
    });
  }
});

// DELETE route to delete a user
app.delete('/api/users/:idStudent', async (req, res) => {
  const { idStudent } = req.params; // Get idStudent from the URL parameter

  try {
    const deletedUser = await User.findOneAndDelete({ idStudent }); // Find and delete by idStudent

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while deleting the user."
    });
  }
});



mongoose.connect("mongodb+srv://kazishakkhar04:ZkoZBplIfAJvIo40@cluster0.khwct.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(5000,{maxHttpHeaderSize: 1e8} ,() => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log('Error:', err);
  });

