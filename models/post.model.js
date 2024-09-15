const mongoose = require("mongoose");
const Saves = require("./saves.model");
const Likes = require("./like.model");
const Comment = require("./comment.model");

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
  multitude: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "multitude",
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
  tags: [
    {
      type: String,
      maxlength: 30,
    },
  ],
});

postSchema.pre("remove", async function (next) {
  try {
    const post = this._id;

    // Delete all saved entries referencing the deleted post
    await Saves.deleteMany({ post });

    next(); // Continue with the deletion process
  } catch (error) {
    next(error); // Handle any errors during the process
  }
});

postSchema.pre("remove", async function (next) {
  try {
    const post = this._id;

    // Delete all saved entries referencing the deleted post
    await Likes.deleteMany({ post });

    next(); // Continue with the deletion process
  } catch (error) {
    next(error); // Handle any errors during the process
  }
});

postSchema.pre("remove", async function (next) {
  try {
    const post = this._id;

    // Delete all saved entries referencing the deleted post
    await Comment.deleteMany({ post_id: post });

    next(); // Continue with the deletion process
  } catch (error) {
    next(error); // Handle any errors during the process
  }
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
