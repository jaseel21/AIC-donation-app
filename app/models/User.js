const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Use bcrypt in production
  role: { type: String, enum: ["Super Admin", "Manager", "Admin", "Staff", "Volunteer", "User"], default: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);