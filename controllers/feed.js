const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");

const Post = require("../models/post");
const User = require("../models/user");

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
  }
  if (!req.file) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }
  Post.create({
    ...req.body,
    imageUrl: req.file.path,
    // creator: { name: "Jenisha" },
    creator: req.userId,
  })
    .then((post) => {
      return User.findByPk(req.userId).then((user) => {
        return user.addPost(post).then(() => {
          return { user, post }; // return both the user and the post for later steps
          // return user.save();
        });
      });
    })
    .then(({ user, post }) => {
      res.status(201).json({
        message: "Post created successfully!",
        creator: { id: user.id, name: user.name },
        post: post.dataValues,
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

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // part1: general error handling
    const error = new Error(
      `${errors.array()[0].path}: ${errors.array()[0].msg}`
    );
    error.statusCode = 422;
    throw error;
  }

  let imageUrl = req.body.imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("No file picked");
    error.statusCode = 422;
    throw error;
  }

  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("post not found");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = req.body.title;
      post.content = req.body.content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then((post) => {
      return res.status(200).json({ message: "Post updated!", post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log(err);
      next(err);
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      // Check logged in user
      if (!post) {
        const err = new Error("Could not find the post");
        err.statusCode = 404;
        throw err;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized");
        error.statusCode = 403;
        throw error;
      }
      clearImage(post.imageUrl);
      return post.destroy();
      // return Post.findB
    })
    .then(() => res.status(200).json({ message: "Deleted post" }))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log("error->", err);
      next(err);
    });
};
