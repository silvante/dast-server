const express = require("express");
const router = express.Router();
const {
  getCollections,
  getCollection,
  addCollection,
  editCollection,
  deleteCollection,
} = require("../controllers/collection.control");

// get all the collections
router.get("/", getCollections);

// get collections by id
router.get("/:id", getCollection);

// add collection
router.post("/", addCollection);

// edit collection by id
router.put("/:id", editCollection);

// delete collection by id
router.delete("/:id", deleteCollection);
module.exports = router;
