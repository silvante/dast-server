const mongoose = require("mongoose");
const Saves = require("./saves.model");
const Post = require("./post.model");

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
  created_at: {
    type: Date,
    default: Date.now, // Automatically sets the current date when the document is created
  },
});

collectionSchema.pre("remove", async function (next) {
  try {
    const collection = this._id;

    await Saves.deleteMany({ collection });
  } catch (error) {
    next(error);
  }
});

collectionSchema.pre("remove", async function (next) {
  try {
    const collection = this._id;

    await Post.updateMany({ collection }, { collection: "deleted" });
  } catch (error) {
    next(error);
  }
});
const PostCollection = mongoose.model("post_collection", collectionSchema);
module.exports = PostCollection;
