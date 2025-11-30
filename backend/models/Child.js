const mongoose = require('mongoose');

const ChildSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameAmharic: String,
  motherName: String,
  sex: { type: String, enum: ['Male', 'Female'] },
  dateOfBirth: Date,
  ageInMonths: Number,
  weight: Number,      // kg
  height: Number,      // cm
  muac: Number,        // mm
  zScore: Number,
  status: { type: String, enum: ['Normal', 'MAM', 'SAM'], default: 'Normal' },
  woreda: String,
  kebele: String,
  healthWorker: { type: mongoose.Schema.Types.ObjectId, ref: 'HealthWorker' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Child', ChildSchema);