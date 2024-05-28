const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/news", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/newsweb.html"));
});

app.set("view engine", "ejs");

const userRouter = require("./routes/users");
const newsRouter = require("./routes/news");

app.use("/users", userRouter);
app.use("/news", newsRouter);

app.listen(process.env.PORT || 3000);
