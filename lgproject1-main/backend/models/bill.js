const mongoose=require('mongoose');

const billSchema=new mongoose.Schema({
    items: [{ name: String, quantity: Number, price: Number }],
  totalPrice: Number,
  email: String

})
module.exports = mongoose.model('bill', billSchema);