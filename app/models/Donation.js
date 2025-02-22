const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ["General", "Yatheem", "Hifz", "Building", "Campaign", "Institute"], required: true },
  userId: { type: String, required: true },
  campaignId: { type: String, default: null },
  instituteId: { type: String, default: null },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', donationSchema);