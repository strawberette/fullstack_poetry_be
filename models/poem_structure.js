const { Sequelize, DataTypes } = require("sequelize");

const connection = require("../connection");

const Poem = connection.define(
  "Poem",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
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

module.exports = Poem;
