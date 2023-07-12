const mongoose = require('mongoose'); // requires mongoose from .json
const Schema = mongoose.Schema;
const Validation = require('../globals/validation');

//Destination Schema (embedded in Flight Schema)
const destinationSchema = new Schema({
  airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'JFK', 'LIS', 'GIG', 'CDG', 'POR'], default: 'DEN'},
  arrival: Date,
});

//Flight Schema
const flightSchema = new Schema({
  airline: {type: String, enum: Validation.airlineList},
  airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'JFK', 'LIS', 'GIG', 'CDG', 'POR'], default: 'DEN'},
  flightNo: {type: Number, min:10, max: 9999, required: true},
  departs: {type: Date, default: Date.now() + 365*24*60*60*1000, required: true},
  destination: [destinationSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Flights', flightSchema);
