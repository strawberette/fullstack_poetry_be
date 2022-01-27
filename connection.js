const { Sequelize } = require("sequelize");

let connection;

if (process.env.NODE_ENV === "PRODUCTION") {
  module.exports.connection = new Sequelize(
    `${process.env.DATABASE_URL}?sslmode=require`,
    {
      url: process.env.DATABASE_URI,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }
  );
} else {
  module.exports.connection = new Sequelize(process.env.DATABASE_URI);
}
