const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("UserAuth", {
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
    // allowNull: true,
    defaultValue: "I am new",
  },
  //   posts: [
  //     {
  //       type: checkSchema.Types.ObjectId,
  //       ref: "Post",
  //     },
  //   ],
});

module.exports = User;
