const express = require("express");
const router = express.Router();
const {
  savePost,
  unsavePost,
  getMysaves,
  saveMultitude,
} = require("../controllers/save.control");

// save post by id
router.post("/post/:id", savePost);

// save multitude by id
router.post("/multitude/:id", saveMultitude);

// delete save by id
router.delete("/:id", unsavePost);

// get users saves
router.get("/", getMysaves);

module.exports = router;
// Swagger documentation for System Saves routes
/**
 * @swagger
 * /api/system/saves/post/{id}:
 *   post:
 *     tags: ["Saves"]
 *     summary: Save a post.
 *     description: Save a specific post by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to save.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Authorization token required in the header.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Authorization:
 *                 type: string
 *                 description: Bearer token.
 *     responses:
 *       201:
 *         description: Post saved successfully.
 *       404:
 *         description: Login required.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/system/saves/multitude/{id}:
 *   post:
 *     tags: ["Saves"]
 *     summary: Save a multitude.
 *     description: Save a specific multitude by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the multitude to save.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Authorization token required in the header.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Authorization:
 *                 type: string
 *                 description: Bearer token.
 *     responses:
 *       201:
 *         description: Multitude saved successfully.
 *       404:
 *         description: Login required.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/system/saves/{id}:
 *   delete:
 *     tags: ["Saves"]
 *     summary: Unsave a post.
 *     description: Remove a saved post by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the saved post to remove.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Authorization token required in the header.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Authorization:
 *                 type: string
 *                 description: Bearer token.
 *     responses:
 *       203:
 *         description: Post unsaved successfully.
 *       404:
 *         description: Login required.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/system/saves/:
 *   get:
 *     tags: ["Saves"]
 *     summary: Get my saved posts.
 *     description: Retrieve all posts saved by the logged-in user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Authorization token required in the header.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Authorization:
 *                 type: string
 *                 description: Bearer token.
 *     responses:
 *       200:
 *         description: List of saved posts.
 *       404:
 *         description: Login required.
 *       500:
 *         description: Server error.
 */
