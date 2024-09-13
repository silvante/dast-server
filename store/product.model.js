const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  shortly: {
    type: String,
  },
  buyers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  product: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
