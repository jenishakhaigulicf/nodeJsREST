// STEP 1: npm init
// STEP 2: install express
// STEP 3: install nodemon
// STEP 4: install body-parser

const express = require("express");

const feedRoutes = require("./routes/feed");

const app = express();

app.use("/feed", feedRoutes);

app.listen(8080);
