const express = require("express");
const router = express.Router();
const {
  getMultitudes,
  getMultitude,
  addMultitude,
  editMultitude,
  deleteMultitude,
} = require("../controllers/multitude.control");

// get all the multitudes
router.get("/", getMultitudes);

// get multitude by id
router.get("/:id", getMultitude);

// add multitude
router.post("/", addMultitude);

// edit multitude by id
router.put("/:id", editMultitude);

// delete multitude by id
router.delete("/:id", deleteMultitude);
module.exports = router;

/**
 * @swagger
 * /api/multitudes:
 *   get:
 *     tags: ["Multitudes"]
 *     summary: Get all multitudes.
 *     description: Retrieve a list of all multitudes.
 *     responses:
 *       200:
 *         description: List of all multitudes.
 *       404:
 *         description: No multitudes found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/multitudes/{id}:
 *   get:
 *     tags: ["Multitudes"]
 *     summary: Get multitude by ID.
 *     description: Retrieve a single multitude by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the multitude to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Multitude details.
 *       404:
 *         description: Multitude not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/multitudes:
 *   post:
 *     tags: ["Multitudes"]
 *     summary: Add a new multitude.
 *     description: Create a new multitude, requires authorization.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Multitude data to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the multitude.
 *               description:
 *                 type: string
 *                 description: Description of the multitude.
 *               banner:
 *                 type: string
 *                 description: Banner URL of the multitude.
 *               icon:
 *                 type: string
 *                 description: Icon URL of the multitude.
 *     responses:
 *       201:
 *         description: New multitude created.
 *       400:
 *         description: Missing required fields.
 *       404:
 *         description: Login required.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/multitudes/{id}:
 *   put:
 *     tags: ["Multitudes"]
 *     summary: Edit a multitude by ID.
 *     description: Edit an existing multitude by its ID, requires authorization.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the multitude to edit.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Fields to update for the multitude.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the multitude.
 *               description:
 *                 type: string
 *                 description: Updated description of the multitude.
 *               banner:
 *                 type: string
 *                 description: Updated banner URL of the multitude.
 *               icon:
 *                 type: string
 *                 description: Updated icon URL of the multitude.
 *     responses:
 *       202:
 *         description: Multitude updated successfully.
 *       404:
 *         description: Multitude not found or not owned by user.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/multitudes/{id}:
 *   delete:
 *     tags: ["Multitudes"]
 *     summary: Delete a multitude by ID.
 *     description: Delete a multitude by its ID, requires authorization.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the multitude to delete.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       203:
 *         description: Multitude deleted successfully.
 *       404:
 *         description: Multitude not found or not owned by user.
 *       500:
 *         description: Server error.
 */
