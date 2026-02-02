const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  image: String,
  price: Number,
  adopted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Pet", petSchema);
