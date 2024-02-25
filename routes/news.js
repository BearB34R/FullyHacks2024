const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("test text");
});

router.get("/new", (req, res) => {
  res.render("news/new");
});

module.exports = router;
