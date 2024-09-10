const mongoose = require("mongoose");

const saveSchama = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  multitude: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "multitude",
  },
  saver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically sets the current date when the document is created
  },
});

const Saves = mongoose.model("saves", saveSchama);

module.exports = Saves;
