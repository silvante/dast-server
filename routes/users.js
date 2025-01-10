const express = require("express");
const {
  getUser,
  getUsers,
  addUser,
  editUser,
  deleteUser,
  verifyOTP,
  resendOTP,
  clearUsers,
} = require("../controllers/user.control");
const router = express.Router();

// clear all users
router.delete("/clear", clearUsers)

// get all users
router.get("/", getUsers);

// get user by ID
router.get("/:id", getUser);

// create user
router.post("/", addUser);

// edit user by id
router.put("/:id", editUser);

// delete user by id
router.delete("/:id", deleteUser);

router.post("/verifyOTP", verifyOTP);

router.post("/resendOTP", resendOTP);

module.exports = router;

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: ["Users"]
 *     summary: Get all users.
 *     description: Retrieves a list of all users.
 *     responses:
 *       200:
 *         description: List of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: No users found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: ["Users"]
 *     summary: Get a user by ID.
 *     description: Retrieves user details by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user's unique ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: ["Users"]
 *     summary: Add a new user.
 *     description: Adds a new user to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *               password:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully created and OTP verification sent.
 *       400:
 *         description: Required fields missing or invalid data.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags: ["Users"]
 *     summary: Edit user by ID.
 *     description: Edits an existing user by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user's unique ID.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               bio:
 *                 type: string
 *               avatar:
 *                 type: string
 *               email:
 *                 type: string
 *               balance:
 *                 type: number
 *               check:
 *                 type: boolean
 *               verificated:
 *                 type: boolean
 *     responses:
 *       202:
 *         description: User successfully updated.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: ["Users"]
 *     summary: Delete a user by ID.
 *     description: Deletes a user by their unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user's unique ID.
 *         schema:
 *           type: string
 *     responses:
 *       203:
 *         description: User successfully deleted.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/users/verifyOTP:
 *   post:
 *     tags: ["Users"]
 *     summary: Verify OTP for user email verification.
 *     description: Verifies the OTP sent to the user's email for account verification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP successfully verified.
 *       400:
 *         description: Invalid OTP or expired OTP.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/users/resendOTP:
 *   post:
 *     tags: ["Users"]
 *     summary: Resend OTP for email verification.
 *     description: Resends the OTP for email verification to the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP successfully resent.
 *       400:
 *         description: Missing fields.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/users/clear:
 *   delete:
 *     tags: ["Users"]
 *     summary: Clear all users.
 *     description: Deletes all users from the database.
 *     responses:
 *       202:
 *         description: All users successfully deleted.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         bio:
 *           type: string
 *         avatar:
 *           type: string
 *         verificated:
 *           type: boolean
 *         balance:
 *           type: number
 *         check:
 *           type: boolean
 */
