const express = require("express");
const router = express.Router();
const {
  getPost,
  getPosts,
  getMyPosts,
  editPost,
  deletePost,
  createPost,
} = require("../controllers/post.control");

// get post by id
router.get("/:id", getPost);

// get all posts
router.get("/", getPosts);

// get users posts
router.get("/user", getMyPosts);

// create post
router.post("/", createPost);

// edit post by id
router.put("/:id", editPost);

// delete post
router.delete("/:id".deletePost);

module.exports = router;
