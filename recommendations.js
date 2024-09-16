const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./routes/extraRoutes");

// importing schemas
const User = require("./models/user.model");
const Post = require("./models/post.model");
const Likes = require("./models/like.model");
const Saves = require("./models/saves.model");
const Comment = require("./models/comment.model");

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
          // fatching posts
          const LikedPosts = await Likes.find({
            liked_by: userDoc.id,
          }).populate("post");
          const savedPosts = await Saves.find({ saver: userDoc.id }).populate(
            "post"
          );
          const commentedPosts = await Comment.find({
            author: userDoc.id,
          }).populate("post_id");

          // if user has interests
          if (commentedPosts.length || savedPosts.length || LikedPosts.length) {
            // Extract tags from liked, saved posts, and commented posts
            const likedTags = LikedPosts.flatMap((like) => like.post.tags);
            const savedTags = savedPosts.flatMap((save) => save.post.tags);
            const commentedTags = commentedPosts.flatMap(
              (comment) => comment.post_id.tags
            );

            // collecting all tags
            const allTags = [
              ...new Set([...likedTags, ...commentedTags, ...savedTags]),
            ];

            // Find recommended posts based on tags

            const recommended_posts = await Post.find({
              tags: { $in: allTags },
              _id: {
                $nin: [
                  ...likedPosts.map((like) => like.post),
                  ...savedPosts.map((save) => save.post),
                ],
              }, // Exclude already interacted post
            });

            req.status(200).send(recommended_posts);
          } else {
            const recommendedPosts = await Post.find();
            req.status(205).send(recommendedPosts);
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
    req.status(404).send(error);
    console.log(error);
  }
});

module.exports = router;
