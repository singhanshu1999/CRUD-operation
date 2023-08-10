const { Pool } = require("pg");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});

const queries = {
  insertActor:
    " INSERT INTO actor (first_name, last_name) VALUES ($1,$2) RETURNING *",
  gettingActor: "SELECT * FROM actor",
  findIdQuery: " SELECT actor_id FROM actor WHERE actor_id=$1 ",
  getActorById: "SELECT * FROM actor WHERE actor_id =$1",
  updateActorById:
    " UPDATE actor SET first_name = $1 WHERE actor_id = $2 RETURNING *",
  removeActorById: " DELETE FROM actor WHERE actor_id = $1 RETURNING * ",
};

module.exports = { pool1, queries };
