// STEP 1: npm init
// STEP 2: install express
// STEP 3: install nodemon
// STEP 4: install body-parser

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const sequelize = require("./util/database");

const feedRoutes = require("./routes/feed");

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname)));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

// mongoose
//   .connect("")
//   .then((res) => {
//     app.listen(8080);
//   })
//   .catch((err) => console.log(err));

sequelize
  // .sync({ force: true })
  .sync()
  .then((cart) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
