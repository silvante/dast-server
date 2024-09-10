const mongoose = require("mongoose");
const Saves = require("./saves.model");
const Post = require("./post.model");

const multitudeSchema = mongoose.Schema({
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

multitudeSchema.pre("remove", async function (next) {
  try {
    const multitude = this._id;

    await Saves.deleteMany({ multitude });
  } catch (error) {
    next(error);
  }
});

multitudeSchema.pre("remove", async function (next) {
  try {
    const multitude = this._id;

    await Post.updateMany({ multitude }, { multitude: "deleted" });
  } catch (error) {
    next(error);
  }
});
const Multitude = mongoose.model("multitude", multitudeSchema);
module.exports = Multitude;
