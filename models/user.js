const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("User", {
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true,
  },
//   posts: [
//     {
//       type: checkSchema.Types.ObjectId,
//       ref: "Post",
//     },
//   ],
});

module.exports = User