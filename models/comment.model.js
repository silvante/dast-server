const mongoose = require("mongoose");

const commentSchama = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "post",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically sets the current date when the document is created
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

const Comment = mongoose.model("comment", commentSchama);
module.exports = Comment;
