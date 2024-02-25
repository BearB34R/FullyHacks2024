const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const userRouter = require("./routes/users");

app.use("/users", userRouter);

app.listen(process.env.PORT || 3000);

// npm run devStart to start
//842fad4e5f5e41f18b790f19082cd425 api key for newsapi
