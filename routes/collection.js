const express = require("express");
const router = express.Router();
const {
  getMultitudes,
  getMultitude,
  addMultitude,
  editMultitude,
  deleteMultitude,
} = require("../controllers/multitude.control");

// get all the multitudes
router.get("/", getMultitudes);

// get multitude by id
router.get("/:id", getMultitude);

// add multitude
router.post("/", addMultitude);

// edit multitude by id
router.put("/:id", editMultitude);

// delete multitude by id
router.delete("/:id", deleteMultitude);
module.exports = router;
