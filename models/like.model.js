const mongoose = require("mongoose");

const likeSchama = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  liked_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically sets the current date when the document is created
  },
});

const Likes = mongoose.model("likes", likeSchama);

module.exports = Likes;
