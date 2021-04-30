import Knex from "knex";

const knexConfig = require("../../knexfile");

const environment = process.env.NODE_ENV || "development";

const connectionConfig = knexConfig[environment];

const knex = Knex(connectionConfig);

export default knex;
