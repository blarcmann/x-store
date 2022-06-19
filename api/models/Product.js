const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: Array, required: true },
    price: { type: Number, required: true },
    categories: { type: Array, required: true },
    discount: { type: Number },
    size: { type: Array },
    color: { type: Array },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
