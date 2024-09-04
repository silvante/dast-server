const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
    maxlength: 240,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  banner: {
    type: String,
  },
  icon: {
    type: String,
  },
});

const Collection = mongoose.model("collection", collectionSchema);
module.exports = Collection;
