const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();

const {
  addProperty,
  deleteProperty,
  showAllProperties,
} = require("../controllers/property");

// POST /api/properties
router.post("/add", auth, addProperty);
router.post("/delete", auth, deleteProperty);
router.get("/all", showAllProperties);

module.exports = router;
