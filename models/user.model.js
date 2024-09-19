const mongoose = require("mongoose");
const Post = require("./post.model");
const Likes = require("./like.model");
const Saves = require("./saves.model");
const Follow = require("./follow.model");
const Multitude = require("./multitude.model");
const Comment = require("./comment.model");

const userSchame = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verificated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  check: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically sets the current date when the document is created
  },
  balance: {
    type: Number,
    default: 120,
  },
});

userSchame.pre("remove", async function (next) {
  try {
    const user = this._id;

    await Saves.deleteMany({ saver: user });
  } catch (error) {
    next(error);
  }
});

userSchame.pre("remove", async function (next) {
  try {
    const user = this._id;

    await Post.deleteMany({ creator: user });
  } catch (error) {
    next(error);
  }
});

userSchame.pre("remove", async function (next) {
  try {
    const user = this._id;

    await Likes.deleteMany({ liked_by: user });
  } catch (error) {
    next(error);
  }
});

userSchame.pre("remove", async function (next) {
  try {
    const user = this._id;

    await Follow.deleteMany({ follower: user });
  } catch (error) {
    next(error);
  }
});

userSchame.pre("remove", async function (next) {
  try {
    const user = this._id;

    await Multitude.deleteMany({ owner: user });
  } catch (error) {
    next(error);
  }
});

userSchame.pre("remove", async function (next) {
  try {
    const user = this._id;

    await Comment.deleteMany({ author: user });
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("user", userSchame);
module.exports = User;
