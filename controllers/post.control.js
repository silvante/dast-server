const Post = require("../models/post.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../routes/extraRoutes");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("creator").populate("multitude");
    if (!posts) {
      res.status(404).send("post are not defined");
    }
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getMyPosts = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    if (!token) {
      res.status(404).send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        try {
          const my_posts = await Post.find({ owner: userDoc.id });
          if (!my_posts) {
            res.status(404).send("you have no posts");
          }
          res.status(200).send(my_posts);
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const createPost = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      res.status(404).send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        try {
          const { title, multitude, image, description, tags } = req.body;
          if (title == null || description == null || multitude == null || image == null) {
            return res.status(404).send({message: "enter all the required fields"})
          }
          const new_post = await Post.create({
            creator: userDoc.id,
            title,
            multitude,
            image,
            tags,
            description,
          });
          if (!new_post) {
            res.status(404).send("filed post...");
          }
          res.status(201).send(new_post);
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const editPost = async (req, res) => {
  const id = req.body.id;
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).send("post does not exsist");
    }
    if (!token) {
      res.status(404).send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        if (userDoc.id !== post.owner) {
          res.status(404).send("this post is not yours");
        } else {
          try {
            const { title, desctiption, multitude, tags } = req.body();
            const edited_post = await Post.findByIdAndUpdate(post._id, {
              title,
              desctiption,
              multitude,
              tags,
            });
            if (!edited_post) {
              res.status(404).send("editing failed...");
            }
          } catch (error) {
            console.log(error);
            res.send(error);
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).send("post does not exsist");
    }
    if (!token) {
      res.status(404).send("login first");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        try {
          if (post.owner !== userDoc.id) {
            res.status(404).send("this is not your post");
          } else {
            const deleted = await Post.findByIdAndDelete(post._id);
            res.status(203).send(deleted);
          }
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).send("post does not exsist");
    }
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  getPosts,
  getMyPosts,
  createPost,
  editPost,
  deletePost,
  getPost,
};
