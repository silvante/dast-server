const express = require("express");
const router = express.Router();
const {
  savePost,
  unsavePost,
  getMysaves,
} = require("../controllers/save.control");

// save post by id
router.post("/:id", savePost);

// delete save by id
router.delete("/:id", unsavePost);

// get users saves
router.get("/", getMysaves);

module.exports = router;
