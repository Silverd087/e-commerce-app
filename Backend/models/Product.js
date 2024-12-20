const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Sport", "Running", "Limited Edition", "Casual"],
  },
  price: {
    type: Number,
    required: true,
  },
  size: [
    {
      type: String,
    },
  ],
  color: [
    {
      type: String,
    },
  ],
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
  },
  color: [
    {
      type: String,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
