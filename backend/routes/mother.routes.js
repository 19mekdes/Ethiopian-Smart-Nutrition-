
const mongoose = require('mongoose');

const MotherSchema = new mongoose.Schema({
  
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  fullNameAmharic: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true, 
    match: [/^(\+251|0)[1-9]\d{8}$/, 'Please enter a valid Ethiopian phone number']
  },
  alternativePhone: String,

  
  age: {
    type: Number,
    min: 15,
    max: 49
  },
  dateOfBirth: Date,

  
  region: {
    type: String,
    required: true
  },
  zone: String,
  woreda: {
    type: String,
    required: true
  },
  kebele: {
    type: String,
    required: true
  },
  gotOrVillage: String,

 
  isPregnant: {
    type: Boolean,
    default: false
  },
  lmpDate: Date, 
  eddDate: Date,  
  ancVisits: [{
    visitDate: Date,
    weight: Number,
    muac: Number, 
    hemoglobin: Number,
    receivedIFA: Boolean
  }],

  
  isLactating: {
    type: Boolean,
    default: false
  },
  monthsPostpartum: Number,
  breastfeedingStatus: {
    type: String,
    enum: ['Exclusive', 'Predominant', 'Partial', 'None'],
    default: 'None'
  },

  
  muac: {
    type: Number, 
    min: 150,
    max: 400
  },
  nutritionStatus: {
    type: String,
    enum: ['Normal', 'MAM', 'SAM'],
    default: 'Normal'
  },
  receivedPlumpyMom: Boolean,
  receivedIFA: Boolean,
  receivedVitaminA: Boolean,

  
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child'
  }],
  healthWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthWorker',
    required: true
  },

  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


MotherSchema.pre('save', function(next) {
  if (this.muac) {
    if (this.muac < 210) this.nutritionStatus = 'SAM';
    else if (this.muac < 230) this.nutritionStatus = 'MAM';
    else this.nutritionStatus = 'Normal';
  }
  this.updatedAt = Date.now();
  next();
});


MotherSchema.index({ woreda: 1, nutritionStatus: 1 });
MotherSchema.index({ healthWorker: 1 });
MotherSchema.index({ phoneNumber: 1 });

module.exports = mongoose.model('Mother', MotherSchema);