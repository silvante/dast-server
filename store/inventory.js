const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../routes/extraRoutes");
const User = require("../models/user.model");
const Product = require("./product.model");

router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split("Bearer ")[1];

      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }

        try {
          const products = await Product.find({ buyers: { $in: [userId] } });
          if (products.length === 0) {
            return res
              .status(404)
              .json({ message: "No products found for you" });
          }
          res.status(200).json(products);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Server error" });
        }
      });
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
