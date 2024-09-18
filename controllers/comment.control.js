const Comment = require("../models/comment.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../routes/extraRoutes");
const User = require("../models/user.model");

// will add coin when comments ("wallet_system")
const createComment = async (req, res) => {
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
          const { content } = req.body;
          const comment = await Commen.create({
            content,
            post_id: id,
            author: userDoc.id,
          });
          if (comment) {
            const new_balance = userDoc.balance + 5;
            await User.findByIdAndUpdate(userDoc.id, {
              balance: new_balance,
            });
          }
          return req.status(201).send(comment);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Server error" });
        }
      });
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    req.send(error);
    console.log(error);
  }
};

const getPostComments = async (req, res) => {
  const id = req.params.id;
  try {
    const comments_of_post = await Comment.find({ post_id: id });
    if (!comments_of_post) {
      res.status(401).json({ message: "server error" });
    }
    res.status(200).send(comments_of_post);
  } catch (error) {
    req.send(error);
    console.log(error);
  }
};

const getComment = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      res.status(404).send("comment not found");
    }
    res.status(200).send(comment);
  } catch (error) {
    req.send(error);
    console.log(error);
  }
};

const updateComment = async (req, res) => {
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
          const comment = await Comment.findById(id);
          const { content } = req.body;
          if (!comment) {
            res.status(404).send("comment is not found");
          }
          if (comment.author !== userDoc.id) {
            res.status.send("this comment is not your");
          }

          const updating = await Comment.findByIdAndUpdate(comment._id, {
            content,
          });
          res.status(203).send(updating);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Server error" });
        }
      });
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    req.send(error);
    console.log(error);
  }
};

const deleteComment = async (req, res) => {
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
          const comment = await Comment.findById(id);
          if (!comment) {
            res.status(404).send("comment is not found");
          }
          if (comment.author !== userDoc.id) {
            res.status.send("this comment is not your");
          }

          const deleted = await Comment.findByIdAndDelete(comment._id);
          res.status(203).send(deleted);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Server error" });
        }
      });
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    req.send(error);
    console.log(error);
  }
};

const likeComment = async (req, res) => {
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
          const comment = await Comment.findById(id);
          if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
          }

          const index = comment.likes.indexOf(userDoc.id);

          if (index === -1) {
            comment.likes.push(userDoc.id);
          } else {
            comment.likes.splice(likedIndex, 1);
          }

          await comment.save();
          res.status(200).json({
            message: likedIndex === -1 ? "Liked" : "Unliked",
            likes: comment.likes.length,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Server error" });
        }
      });
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    req.send(error);
    console.log(error);
  }
};

const replyComment = async (req, res) => {
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
          const { content } = req.body;

          const originalComment = await Comment.findById(id);
          if (!originalComment) {
            return res.status(404).json({ message: "Comment not found" });
          }

          if (!content) {
            return res
              .status(400)
              .json({ message: "Reply content is required" });
          }

          const replyComment = await Comment.create({
            content,
            author: userDoc.id,
            post_id: originalComment.post_id,
          });

          originalComment.replies.push(replyComment._id);

          await originalComment.save();
          res.status(201).json({ message: "Reply added", replyComment });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Server error" });
        }
      });
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    req.send(error);
    console.log(error);
  }
};
module.exports = {
  createComment,
  getComment,
  getPostComments,
  updateComment,
  deleteComment,
  likeComment,
  replyComment,
};
