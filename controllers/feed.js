const { validationResult } = require("express-validator");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.findAll()
    .then((posts) => {
      res.status(200).json({ message: "Fetched posts successfully", posts });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log(err);
      next(err);
    });
};

exports.createPosts = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // part1: general error handling
    const error = new Error(
      `${errors.array()[0].path}: ${errors.array()[0].msg}`
    );
    error.statusCode = 422;
    throw error;
    // return res.status(422).json({
    //   message: `${errors.array()[0].path}: ${errors.array()[0].msg}`,
    //   errors: errors.array(),
    // });
  }
  Post.create({
    ...req.body,
    imageUrl: "images/duck.jpg",
    creator: { name: "Jenisha" },
  })
    .then((response) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: response.dataValues,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log(err);
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find the post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Post fetched successfully", post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log(err);
      next(err);
    });
};
