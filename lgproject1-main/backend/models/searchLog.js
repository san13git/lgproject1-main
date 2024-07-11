const mongoose = require('mongoose');  //model ke naam se collection create hota h

const searchLogSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  productId: { type: Number, required: true },
  searchCount: { type: Number, default: 1 },
  timestamp: { type: Date, default: Date.now }
});

searchLogSchema.index({ userEmail: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('SearchLog', searchLogSchema);