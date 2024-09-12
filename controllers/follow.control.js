const Follow = require("../models/follow.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../routes/extraRoutes");
const User = require("../models/user.model");

// will add coin when follows ("wallet_system")
const followTo = async (req, res) => {
  const id = req.params.id;
  try {
    const the_user = await User.findById(id);
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      req.status(404).send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userdoc) => {
        if (err) throw err;
        try {
          if (!the_user) {
            res.status(404).send("user is not found");
          }
          const followed = await Follow.create({
            follows_to: id,
            follower: userdoc.id,
          });
          const new_balance = the_user.balance + 12;
          await User.findByIdAndUpdate(the_user._id, {
            balance: new_balance,
          });
          res.status(201).send(followed);
        } catch (error) {
          console.log(err);
          res.send(error);
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const unfollow = async (req, res) => {
  const id = req.params.id;
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const follow = await Follow.findById(id);
    if (!follow) {
      res.send("subscription is not defined");
    }
    if (!token) {
      req.status(404).send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userdoc) => {
        if (err) throw err;
        if (userdoc.id !== follow.follower) {
          res.send("server error, sorry for it...");
        } else {
          const deleted = await Follow.findByIdAndDelete(follow._id);
          res.status(203).send(deleted);
        }
      });
    }
  } catch (error) {
    console.log(err);
    res.send(error);
  }
};

const getFollowers = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      req.status(404).send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userdoc) => {
        if (err) throw err;
        const my_followers = await Follow.find({
          follows_to: userdoc.id,
        }).populate("follower");
        res.status(200).send(my_followers);
      });
    }
  } catch (error) {
    console.log(err);
    res.send(error);
  }
};

const getFollows = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      req.status(404).send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userdoc) => {
        if (err) throw err;
        const my_follows = await Follow.find({ follower: userdoc.id }).populate(
          "follows_to"
        );
        res.status(200).send(my_follows);
      });
    }
  } catch (error) {
    console.log(err);
    res.send(error);
  }
};

module.exports = { followTo, unfollow, getFollowers, getFollows };
