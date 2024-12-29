const express = require("express");
const router = express.Router();
const {
  getProduct,
  getProducts,
  addProduct,
  buyProduct,
  sellProduct,
} = require("./product.control");

// get all products
router.get("/", getProducts);

// get product by id
router.get("/:id", getProduct);

// add new product
router.post("/", addProduct);

// buy producty
router.put("/buy/:id", buyProduct);

// sell product
router.put("/sell/:id", sellProduct);

module.exports = router;

/**
 * @swagger
 * /store:
 *   get:
 *     tags: ["Store"]
 *     summary: Get all products
 *     description: Fetches all products from the store.
 *     responses:
 *       200:
 *         description: List of all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found.
 *       401:
 *         description: Unauthorized access, invalid or missing token.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /store/{id}:
 *   get:
 *     tags: ["Store"]
 *     summary: Get a single product by ID
 *     description: Fetch a product by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *       401:
 *         description: Unauthorized access, invalid or missing token.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /store:
 *   post:
 *     tags: ["Store"]
 *     summary: Add a new product
 *     description: Creates a new product in the store.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *               title:
 *                 type: string
 *               shortly:
 *                 type: string
 *               cost:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Product successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized access, invalid or missing token.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /store/buy/{id}:
 *   put:
 *     tags: ["Store"]
 *     summary: Buy a product
 *     description: Allows a user to buy a product from the store.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to buy.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Product purchased successfully.
 *       401:
 *         description: Unauthorized access, invalid or missing token.
 *       404:
 *         description: Product not found or insufficient funds.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /store/sell/{id}:
 *   put:
 *     tags: ["Store"]
 *     summary: Sell a product
 *     description: Allows a user to sell a product, removing it from their purchase list.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to sell.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product sold successfully.
 *       401:
 *         description: Unauthorized access, invalid or missing token.
 *       404:
 *         description: Product not found or you haven't purchased this product.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         product:
 *           type: string
 *         title:
 *           type: string
 *         shortly:
 *           type: string
 *         cost:
 *           type: number
 *           format: float
 *         buyers:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
