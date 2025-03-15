const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  idStudent: { type: Number, required: true, unique: true },
  name: { type: String, default: "alis" },
  email: { type: String },
  password: { type: String },
  age: { type: Number },
  cgpa: { type: Number },
  date: { type: Date, default: Date.now },
  department: {
    type: String,
    enum: ['CSE', 'EEE', 'MPE', 'CEE'],
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
