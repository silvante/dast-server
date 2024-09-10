const express = require("express");
const router = express.Router();
const {
  savePost,
  unsavePost,
  getMysaves,
  saveMultitude,
} = require("../controllers/save.control");

// save post by id
router.post("/post/:id", savePost);

// save multitude by id
router.post("/multitude/:id", saveMultitude);

// delete save by id
router.delete("/:id", unsavePost);

// get users saves
router.get("/", getMysaves);

module.exports = router;
