const Collection = require("../models/collection.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../routes/extraRoutes");

const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    if (!collections) {
      res.status(404).send("collectons do not exsist");
    }
    res.status(200).send(collections);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getCollection = async (req, res) => {
  const id = req.params.id;
  try {
    const collection = await Collection.findById(id);
    if (!collection) {
      res.status(404).send("collection does not exsist");
    }
    res.status(200).send(collection);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const addCollection = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      res.status(404).send("login first");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) {
          throw err;
        }
        try {
          const { title, description, banner, icon } = req.body;
          const newCollection = await Collection.create({
            title,
            description,
            banner,
            icon,
            owner: userDoc.id,
          });
          res.status(201).send(newCollection);
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const editCollection = async (req, res) => {
  const id = req.params.id;
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      res.status(404).send("login first...");
    } else {
      const collection = await Collection.findById(id);
      if (!collection) {
        res.status(404).send("collection does not exsist");
      } else {
        jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
          if (err) throw err;
          if (collection.owner !== userDoc.id) {
            res.status(404).send("this collection is not yours");
          } else {
            try {
              const { banner, icon, title, description } = req.body;
              const edited = await Collection.findByIdAndUpdate(
                collection._id,
                { banner, icon, title, description }
              );
              res.status(202).send(editCollection);
            } catch (error) {
              console.log(error);
              res.json(error);
            }
          }
        });
      }
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

const deleteCollection = async (req, res) => {
  const id = req.params.id;
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const collection = await Collection.findById(id);
    if (!collection) {
      res.status(404).send("collection does not exsist");
    }
    if (!token) {
      res.status(404).send("login first");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        if (collection._id !== userDoc.id) {
          res.status(404).send("this is not your collection");
        } else {
          const deleted = await Collection.findByIdAndDelete(collection._id);
          res.status(203).send(deleted);
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  getCollections,
  getCollection,
  addCollection,
  editCollection,
  deleteCollection,
};
