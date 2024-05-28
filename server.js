const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

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

console.log(process.env.test);
print(process.env.test);

app.listen(process.env.PORT || 3000);
