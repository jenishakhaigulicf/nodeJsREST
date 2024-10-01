const { validationResult } = require("express-validator");

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
    return res.status(422).json({
      message: `${errors.array()[0].path}: ${errors.array()[0].msg}`,
      errors: errors.array(),
    });
  }
  res.status(201).json({
    message: "Post created successfully!",
    post: {
      _id: new Date().toISOString(),
      ...req.body,
      creator: { name: "Jenisha" },
      createdAt: new Date(),
    },
  });
};
