const express = require("express");
const router = express.Router();
const {
  createComment,
  getComment,
  getPostComments,
  deleteComment,
  updateComment,
  replyComment,
  likeComment,
} = require("../controllers/comment.control");

// creating comment by id of post
router.post("/:id", createComment);

// get comment by id
router.get("/:id", getComment);

// get posts comments
router.get("/post/:id", getPostComments);

// edit comment by id
router.put("/:id", updateComment);

// delete comment by id
router.delete("/:id", deleteComment);

// like the comment by id of the comment
router.post("/like/:id", likeComment);

// reply comment by the id of the comment
router.post("/reply/:id", replyComment);

module.exports = router;
