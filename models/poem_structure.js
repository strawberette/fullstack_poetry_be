const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user");
const connection = require("../connection");

const Poem = connection.define(
  "Poem",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    indexed: [{ unique: true, fields: ["title"] }],
  }
);
Poem.belongsTo(User);

module.exports = Poem;
