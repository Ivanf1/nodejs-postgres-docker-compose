require("dotenv").config();

const commons = {
  client: "pg",
  // migrations: {
  //   directory: "./db/migrations",
  // },
  // seeds: {
  //   directory: "./db/seeds",
  // },
};

module.exports = {
  development: {
    ...commons,
    connection: process.env.DATABASE_URL_KNEX,
  },
  test: {
    ...commons,
    connection: process.env.DATABASE_URL_KNEX_TEST,
  },
};
