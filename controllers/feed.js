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

exports.postPosts = (req, res, next) => {
  res.status(201).json({
    message: "Post created successfully!",
    post: { id: new Date().toISOString(), ...req.body },
  });
};
