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

router.put("/equip/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split("Bearer ")[1];

      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }

        try {
          const product = await Product.find({ _id: id });
          if (!product) {
            return res.status(404).json({ message: "product not found" });
          }
          if (!product.buyers.includes(userDoc.id)) {
            return res
              .status(404)
              .send("you have no this item in your inventory");
          }
          const equiped = await User.findByIdAndUpdate(userDoc.id, {
            check: product._id,
          });
          res.status(200).send("your item is equiped");
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