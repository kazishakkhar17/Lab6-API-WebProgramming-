const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World everyone!')
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})

mongoose.connect("mongodb+srv://kazishakkhar04:ZkoZBplIfAJvIo40@cluster0.khwct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log('Connected!'));