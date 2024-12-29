const express = require("express");
const router = express.Router();
const {
  getMyLikedPosts,
  likePostById,
  unlikePost,
  getPostLikes,
  getAllLikes,
} = require("../controllers/like.control");

// get liked users of post by id
router.get("/:id", getPostLikes);

// get my liked posts
router.get("/", getMyLikedPosts);

// like post
router.post("/:id", likePostById);

// unlike post
router.delete("/:id", unlikePost);

router.get("/all", getAllLikes)

module.exports = router;

/**
 * @swagger
 * /api/system/likes/{id}:
 *   get:
 *     tags: ["Likes"]
 *     summary: Get all likes for a post.
 *     description: Retrieve all likes for a specific post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to get likes for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of likes for the post.
 *       404:
 *         description: No likes found for the post.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/system/likes/{id}:
 *   post:
 *     tags: ["Likes"]
 *     summary: Like a post.
 *     description: Like a post by its ID and add coins to the user’s balance, requires authorization.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to like.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Successfully liked the post.
 *       401:
 *         description: Invalid token or no token provided.
 *       404:
 *         description: Post or user not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/system/likes/{id}:
 *   delete:
 *     tags: ["Likes"]
 *     summary: Unlike a post.
 *     description: Unlike a post by its ID, requires authorization.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the like to remove.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully unliked the post.
 *       401:
 *         description: Invalid token or no token provided.
 *       404:
 *         description: Like not found or not authorized to unlike.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/system/likes:
 *   get:
 *     tags: ["Likes"]
 *     summary: Get all posts liked by the current user.
 *     description: Retrieve all posts liked by the logged-in user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of liked posts.
 *       401:
 *         description: Invalid token or no token provided.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/system/likes/all:
 *   get:
 *     tags: ["Likes"]
 *     summary: Get all likes in the system.
 *     description: Retrieve a list of all likes across the system.
 *     responses:
 *       200:
 *         description: List of all likes.
 *       500:
 *         description: Server error.
 */
