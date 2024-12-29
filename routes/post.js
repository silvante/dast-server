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
router.delete("/:id", deletePost);

module.exports = router;

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags: ["Posts"]
 *     summary: Get all posts.
 *     description: Retrieve all posts with populated creator and multitude.
 *     responses:
 *       200:
 *         description: List of all posts.
 *       404:
 *         description: No posts found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/posts/my:
 *   get:
 *     tags: ["Posts"]
 *     summary: Get my posts.
 *     description: Retrieve posts created by the logged-in user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's posts.
 *       404:
 *         description: No posts found or login required.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags: ["Posts"]
 *     summary: Create a new post.
 *     description: Creates a new post for the logged-in user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The details of the post to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Authorization:
 *                 type: string
 *                 description: Bearer token.
 *               title:
 *                 type: string
 *                 description: Post title.
 *               description:
 *                 type: string
 *                 description: Post description.
 *               multitude:
 *                 type: string
 *                 description: Multitude ID for the post.
 *               image:
 *                 type: string
 *                 description: Image URL for the post.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Post tags.
 *     responses:
 *       201:
 *         description: Post created successfully.
 *       404:
 *         description: Missing required fields or failed to create post.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     tags: ["Posts"]
 *     summary: Get a single post by ID.
 *     description: Retrieve the post with the specified ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the post.
 *     responses:
 *       200:
 *         description: The post details.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     tags: ["Posts"]
 *     summary: Edit an existing post.
 *     description: Update the details of an existing post.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the post to be edited.
 *     requestBody:
 *       description: The updated post details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Authorization:
 *                 type: string
 *                 description: Bearer token.
 *               title:
 *                 type: string
 *                 description: Post title.
 *               description:
 *                 type: string
 *                 description: Post description.
 *               multitude:
 *                 type: string
 *                 description: Multitude ID for the post.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Post tags.
 *     responses:
 *       200:
 *         description: Post updated successfully.
 *       404:
 *         description: Post not found or not authorized.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     tags: ["Posts"]
 *     summary: Delete a post.
 *     description: Delete the post with the specified ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: ID of the post to be deleted.
 *     responses:
 *       203:
 *         description: Post deleted successfully.
 *       404:
 *         description: Post not found or not authorized.
 *       500:
 *         description: Server error.
 */
