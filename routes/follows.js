const express = require("express");
const router = express.Router();
const {
  getFollowers,
  getFollows,
  followTo,
  unfollow,
} = require("../controllers/follow.control");

// get followers
router.get("/get_followers", getFollowers);

// get follows
router.get("/get_follows", getFollows);

// follow to someone by id
router.post("/:id", followTo);

// unfollow for subscription by id
router.delete("/:id", unfollow);

module.exports = router;
