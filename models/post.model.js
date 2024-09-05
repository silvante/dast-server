const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 55,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  collection_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "collection",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically sets the current date when the document is created
  },
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
