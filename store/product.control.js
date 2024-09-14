const Product = require("./product.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../routes/extraRoutes");
const User = require("../models/user.model");

const addProduct = async (req, res) => {
  try {
    const { product, title, shortly, cost } = req.body;
    const new_product = await Product.create({ product, title, shortly, cost });
    if (!new_product) {
      res.status(404).send("something went wrong");
    }
    res.status(201).send(new_product);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send("something went wrong");
    }
    res.status(200).send(product);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(404).send("products not found");
    }
    res.status(200).send(products);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

const buyProduct = async (req, res) => {
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
          const product = await Product.findById(id);
          if (!product) {
            req.status(404).send("product is not defined");
          }
          const the_user = await User.find({ _id: userDoc.id });
          const B = product.buyers.includes(the_user._id);

          if (the_user.balance < product.cost) {
            res.send("you have no enoght coins");
          } else {
            const new_balance = the_user.balance - product.cost;
          }

          if (!B) {
            const added = await Product.findByIdAndUpdate(
              product._id,
              { $push: { buyers: the_user._id } },
              { new: true }
            );
            await User.findByIdAndUpdate(the_user._id, {
              balance: new_balance,
            });
            res.status(201).send({
              messange: "porchuced successfuly",
              info: {
                you_bought: added,
                your_balance: new_balance,
              },
            });
          } else {
            res.status(404).send("you already bought this product");
          }
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
};

const sellProduct = async (req, res) => {
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
          const product = await Product.findById(id);
          if (!product) {
            req.status(404).send("product is not defined");
          }
          const the_user = await User.find({ _id: userDoc.id });
          const B = product.buyers.includes(the_user._id);

          if (!B) {
            res.status(404).send("you has no this products");
          } else {
            const removed = await Product.findByIdAndUpdate(
              product._id,
              { $pull: { buyers: the_user._id } },
              { new: true }
            );
            const new_balance = the_user.balance + product.cost;
            await User.findByIdAndUpdate(the_user._id, {
              balance: new_balance,
            });
            if (!removed) {
              return res.status(404).json({ message: "Post not found" });
            }

            res.status(200).json({
              message: "Like removed",
              info: {
                you_selled: removed,
                your_balance: new_balance,
              },
            });
          }
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
};

module.exports = { addProduct, getProduct, getProducts, buyProduct, sellProduct };
