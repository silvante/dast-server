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

/**
 * @swagger
 * /api/system/follows/get_followers:
 *   get:
 *     tags: ["Follows"]
 *     summary: Get the followers of the logged-in user.
 *     description: Retrieve a list of followers for the currently logged-in user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of followers for the logged-in user.
 *       401:
 *         description: Invalid token or no token provided.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/system/follows/get_follows:
 *   get:
 *     tags: ["Follows"]
 *     summary: Get the users the logged-in user is following.
 *     description: Retrieve a list of users that the logged-in user is following.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users the logged-in user is following.
 *       401:
 *         description: Invalid token or no token provided.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/system/follows/{id}:
 *   post:
 *     tags: ["Follows"]
 *     summary: Follow a user.
 *     description: Follow a user by their ID and add coins to the follower's balance, requires authorization.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to follow.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Successfully followed the user.
 *       401:
 *         description: Invalid token or no token provided.
 *       404:
 *         description: User not found or follow failed.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/system/follows/{id}:
 *   delete:
 *     tags: ["Follows"]
 *     summary: Unfollow a user.
 *     description: Unfollow a user by their ID, requires authorization.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to unfollow.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully unfollowed the user.
 *       401:
 *         description: Invalid token or no token provided.
 *       404:
 *         description: Follow not found or not authorized to unfollow.
 *       500:
 *         description: Server error.
 */
