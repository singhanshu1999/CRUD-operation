const { Pool } = require("pg");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});

module.exports = pool1;
