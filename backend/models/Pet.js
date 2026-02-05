const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  image: String,
  price: Number,
  sellerEmail: String, 
  adopted: {
    type: Boolean,
    default: false
  },
  // Intha fields-a ippo namma sethurukkom - Appo thaan details save aagum
  buyerEmail: { 
    type: String, 
    default: "" 
  },
  buyerName: { 
    type: String, 
    default: "" 
  },
  buyerAddress: { 
    type: String, 
    default: "" 
  },
  buyerPhone: { 
    type: String, 
    default: "" 
  }
});

module.exports = mongoose.model("Pet", petSchema);