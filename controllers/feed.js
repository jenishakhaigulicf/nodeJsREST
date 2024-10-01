const { validationResult } = require("express-validator");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "image/duck.jpg",
        creator: {
          name: "Jenisha",
        },
        createdAt: new Date(),
      },
    ],
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
      console.log(response.dataValues);
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
