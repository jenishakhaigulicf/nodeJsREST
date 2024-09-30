exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "First Post", content: "This is the first post!" }],
  });
};

exports.postPosts = (req, res, next) => {
  res.status(201).json({
    message: "Post created successfully!",
    post: { id: new Date().toISOString(), ...req.body },
  });
};
