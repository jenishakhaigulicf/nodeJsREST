// STEP 1: npm init
// STEP 2: install express
// STEP 3: install nodemon
// STEP 4: install body-parser

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const sequelize = require("./util/database");
const multer = require("multer");

const authRoutes = require("./routes/auth");
const feedRoutes = require("./routes/feed");

const User = require("./models/user");
const Post = require("./models/post")

const app = express();

const fileStorage = multer.diskStorage({
  // for destination
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  // for filename
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single("imageUrl"));
// Note: __dirname will give the path of current file, images is the sibling folder
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/feed", feedRoutes);

// Note: part2: general error handling function
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data || []
  res.status(status).json({ message, data });
});

User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts",
});

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
