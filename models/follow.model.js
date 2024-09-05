const mongoose = require("mongoose");

const followSchema = mongoose.Schema({
  follows_to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically sets the current date when the document is created
  },
});

const Follow = mongoose.model("follow", followSchema);
module.exports = Follow;
