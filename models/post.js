// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// mongoDB
// const postSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     imageUrl: {
//       type: String,
//       required: true,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//     creator: {
//       type: Object,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Post", postSchema);

const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Post = sequelize.define(
  "Post",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    creator: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Sequelize will automatically manage `createdAt` and `updatedAt`
  }
);

module.exports = Post;
