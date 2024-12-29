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

/**
 * @swagger
 * /api/comments/{id}:
 *   post:
 *     tags: ["Comments"]
 *     summary: Create a comment on a post.
 *     description: Add a comment to a post by its ID and add coins to the commenter's balance.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to comment on.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Successfully created comment.
 *       400:
 *         description: Invalid input.
 *       401:
 *         description: Invalid token or no token provided.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     tags: ["Comments"]
 *     summary: Get a specific comment by ID.
 *     description: Retrieve a comment by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved comment.
 *       404:
 *         description: Comment not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/comments/post/{id}:
 *   get:
 *     tags: ["Comments"]
 *     summary: Get comments of a specific post.
 *     description: Retrieve all comments for a specific post by post ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments for the post.
 *       404:
 *         description: No comments found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     tags: ["Comments"]
 *     summary: Update an existing comment by ID.
 *     description: Modify the content of an existing comment if the author is the logged-in user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: content
 *         required: true
 *         description: New content of the comment.
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       203:
 *         description: Successfully updated comment.
 *       400:
 *         description: Invalid input.
 *       401:
 *         description: Invalid token or no token provided.
 *       404:
 *         description: Comment not found or not authorized to update.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     tags: ["Comments"]
 *     summary: Delete a comment by ID.
 *     description: Remove a comment by its ID if the author is the logged-in user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to delete.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       203:
 *         description: Successfully deleted comment.
 *       401:
 *         description: Invalid token or no token provided.
 *       404:
 *         description: Comment not found or not authorized to delete.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/comments/like/{id}:
 *   post:
 *     tags: ["Comments"]
 *     summary: Like or unlike a comment.
 *     description: Like a comment by ID or unlike if already liked.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to like/unlike.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully liked/unliked the comment.
 *       401:
 *         description: Invalid token or no token provided.
 *       404:
 *         description: Comment not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/comments/reply/{id}:
 *   post:
 *     tags: ["Comments"]
 *     summary: Reply to a comment.
 *     description: Add a reply to a comment by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to reply to.
 *         schema:
 *           type: string
 *       - in: body
 *         name: content
 *         required: true
 *         description: Content of the reply.
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Successfully added reply to the comment.
 *       400:
 *         description: Missing reply content.
 *       401:
 *         description: Invalid token or no token provided.
 *       404:
 *         description: Comment not found.
 *       500:
 *         description: Server error.
 */
