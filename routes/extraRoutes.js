const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user.model");
// const Comment = require("../models/comments.model");
const jwtSecret = "dily_valentine_d34DJ058jsllass345dd";

// login part codes
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("User not found");
  }

  if (user.verificated !== true) {
    res.status(400).send("your account is not verified");
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {});

  res.send(token);
});

// profile part codes
router.get("/profile", async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (token) {
      try {
        jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
          if (err) throw err;
          const {
            _id,
            email,
            username,
            name,
            mobile,
            telegram,
            bio,
            avatar,
            verificated,
          } = await User.findById(userDoc.id);
          res.json({
            _id,
            email,
            username,
            name,
            mobile,
            telegram,
            bio,
            avatar,
            verificated,
          });
        });
      } catch (error) {
        console.log(err);
        res.send(err);
      }
    } else {
      res.json(null);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// log out part codes
router.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

module.exports = { router, jwtSecret };
