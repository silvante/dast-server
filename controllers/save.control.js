const Saves = require("../models/saves.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../routes/extraRoutes");

const savePost = async (req, res) => {
  const id = req.params.id;
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      req.status(404).send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userdoc) => {
        if (err) throw err;
        try {
          const saved = await Saves.create({
            post: id,
            saver: userdoc.id,
          });
          res.status(201).send(saved);
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

const saveMultitude = async (req, res) => {
  const id = req.params.id;
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      req.status(404).send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userdoc) => {
        if (err) throw err;
        try {
          const saved = await Saves.create({
            multitude: id,
            saver: userdoc.id,
          });
          res.status(201).send(saved);
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

const unsavePost = async (req, res) => {
  const id = req.params.id;
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const save = await Saves.findById(id);
    if (!save) {
      res.send("saved post is not defined");
    }
    if (!token) {
      req.status(404).send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userdoc) => {
        if (err) throw err;
        if (userdoc.id !== save.saver) {
          res.send("server error, sorry for it...");
        } else {
          const deleted = await Saves.findByIdAndDelete(save._id);
          res.status(203).send(deleted);
        }
      });
    }
  } catch (error) {
    console.log(err);
    res.send(error);
  }
};

const getMysaves = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      req.status(404).send("login first...");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userdoc) => {
        if (err) throw err;
        const my_saves = await Saves.find({
          saver: userdoc.id,
        }).populate("post");
        res.status(200).send(my_saves);
      });
    }
  } catch (error) {
    console.log(err);
    res.send(error);
  }
};

module.exports = { savePost, unsavePost, getMysaves, saveMultitude };
