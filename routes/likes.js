const express = require("express");
const router = express.Router();
const {
  getMyLikedPosts,
  likePostById,
  unlikePost,
  getPostLikes,
} = require("../controllers/like.control");

// get liked users of post by id
router.get("/:id", getPostLikes);

// get my liked posts
router.get("/", getMyLikedPosts);

// like post
router.post("/:id", likePostById);

// unlike post
router.delete("/:id", unlikePost);

module.exports = router;
