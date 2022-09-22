const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    images: { type: Array, required: true },
    sku: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    tags: { type: Array, required: true },
    inStock: { type: Boolean, default: true },
    gender: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
