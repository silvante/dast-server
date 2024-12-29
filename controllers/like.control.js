const Likes = require("../models/like.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../routes/extraRoutes");
const Post = require("../models/post.model");
const User = require("../models/user.model");


// will add coin when likes ("wallet_system")
const likePostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    const the_user = await User.findById(post.creator);
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split("Bearer ")[1];

      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }

        try {
          const new_like = await Likes.create({
            post: id,
            liked_by: userDoc.id,
          });

          if (!the_user) {
            res.send(404).send("user not found");
          }

          const new_balance = the_user.balance + 4;

          await User.findByIdAndUpdate(the_user._id, {
            balance: new_balance,
          });

          res.status(201).send(new_like);
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

const getPostLikes = async (req, res) => {
  const id = req.params.id;
  try {
    const post_likes = await Likes.find({ post: id }).populate("liked_by");
    if (!post_likes || post_likes.length === 0) {
      res.send("post has no likes now");
    }
    res.send(post_likes);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

const unlikePost = async (req, res) => {
  const id = req.params.id;
  try {
    const like = await Likes.findById(id);
    if (!like) {
      res.status(404).send("like has not found");
    }
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split("Bearer ")[1];

      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }

        try {
          if (like.liked_by !== userDoc.id) {
            res.startsWith(404).send("server error maybe");
          }

          const unlked = await Likes.findByIdAndDelete(like._id);
          res.send("uliked");
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

const getMyLikedPosts = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split("Bearer ")[1];

      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }

        try {
          const my_liked = await Likes.find({ liked_by: userDoc.id }).populate(
            "post"
          );
          if (my_liked.length === 0) {
            res.send(201).send("you have no liked videos now like the video");
          }
          res.status(201).send(my_liked);
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

const getAllLikes = async (req, res) => {
  try {
    const likes = await Likes.find();
    if (!likes) {
      res.send(404).send("server error maybe");
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

module.exports = { getPostLikes, likePostById, unlikePost, getMyLikedPosts, getAllLikes };
