const mongoose = require('mongoose');

const HealthWorkerSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  woreda: String,
  kebele: String,
  role: { type: String, enum: ['HEW', 'Supervisor'], default: 'HEW' },
  password: String
});

module.exports = mongoose.model('HealthWorker', HealthWorkerSchema);