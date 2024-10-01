const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");

const router = express.Router();

router.get("/posts", feedController.getPosts);
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 7 }).withMessage('Length is less than 5'),
    body("content").trim().isLength({ min: 5 }).withMessage('Length is less than 5'),
  ],
  feedController.createPosts
);

module.exports = router;
