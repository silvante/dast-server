const express = require("express");
const router = express.Router();
const {
  savePost,
  unsavePost,
  getMysaves,
  saveCollection,
} = require("../controllers/save.control");

// save post by id
router.post("/post/:id", savePost);

// save collection by id
router.post("/collection/:id", saveCollection);

// delete save by id
router.delete("/:id", unsavePost);

// get users saves
router.get("/", getMysaves);

module.exports = router;
