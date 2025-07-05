const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["appetizer", "main", "dessert", "beverage"],
  },
  availability: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Menu", MenuSchema);
