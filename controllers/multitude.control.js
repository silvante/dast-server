const Multitude = require("../models/multitude.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../routes/extraRoutes");

const getMultitudes = async (req, res) => {
  try {
    const multitudes = await Multitude.find().populate("owner");
    if (!multitudes) {
      res.status(404).send("collectons do not exsist");
    }
    res.status(200).send(multitudes);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getMultitude = async (req, res) => {
  const id = req.params.id;
  try {
    const multitude = await Multitude.findById(id).populate("owner");
    if (!multitude) {
      res.status(404).send("multitude does not exsist");
    }
    res.status(200).send(multitude);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const addMultitude = async (req, res) => {
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
          if (title == null || description == null || banner == null || icon == null) {
            return res.status(404).send({message: "enter all the required fields"})
          }
          const newMultitude = await Multitude.create({
            title,
            description,
            banner,
            icon,
            owner: userDoc.id,
          });
          res.status(201).send(newMultitude);
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

const editMultitude = async (req, res) => {
  const id = req.params.id;
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      res.status(404).send("login first...");
    } else {
      const multitude = await Multitude.findById(id);
      if (!multitude) {
        res.status(404).send("multitude does not exsist");
      } else {
        jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
          if (err) throw err;
          try {
            if (multitude.owner !== userDoc.id) {
              res.status(404).send("this multitude is not yours");
            } else {
              try {
                const { banner, icon, title, description } = req.body;
                const edited = await Multitude.findByIdAndUpdate(
                  multitude._id,
                  { banner, icon, title, description }
                );
                res.status(202).send(edited);
              } catch (error) {
                console.log(error);
                res.json(error);
              }
            }
          } catch (error) {
            console.log(error);
            res.send(error);
          }
        });
      }
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

const deleteMultitude = async (req, res) => {
  const id = req.params.id;
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const multitude = await Multitude.findById(id);
    if (!multitude) {
      res.status(404).send("multitude does not exsist");
    }
    if (!token) {
      res.status(404).send("login first");
    } else {
      jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
        if (err) throw err;
        try {
          if (multitude.owner !== userDoc.id) {
            res.status(404).send("this is not your multitude");
          } else {
            const deleted = await Multitude.findByIdAndDelete(multitude._id);
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

module.exports = {
  getMultitudes,
  getMultitude,
  addMultitude,
  editMultitude,
  deleteMultitude,
};
