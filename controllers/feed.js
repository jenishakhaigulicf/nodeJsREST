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
  // get id
  const postId = req.params.postId;
  // find by id from the db
  Post.findByPk(postId)
    .then((post) => {
      // if not post found then throw error
      if (!post) {
        const error = new Error("Could not find the post.");
        error.statusCode = 404;
        throw error;
        // goes to catch block
      }
      // if no error then send response with status code
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
