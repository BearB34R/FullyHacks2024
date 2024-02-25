const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("user List");
});

router.get("/new", (req, res) => {
  res.render("users/new");
});

router.post("/", (res, req) => {
  console.log(res.body.firstName);
  res.send("hi");
});

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    res.send("Get User With ID " + req.params.id);
  })
  .put((req, res) => {
    res.send("Update User With ID " + req.params.id);
  })
  .delete((req, res) => {
    res.send("Delete User With ID " + req.params.id);
  });

const users = [{ name: "Kyle" }, { name: "Sally" }];
router.param("id", (req, res, next, id) => {
  req.user = users[id];
  next();
});

module.exports = router;
