const { Pool } = require("pg");

const validation = require("../validation/actorValidation");

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

async function actorCreateQuery(ActorInfoDaoInstance) {
  //const { first_name, last_name } = actorData;
  console.log("ActorInfoDaoInstance: ", ActorInfoDaoInstance);
  const { error } = validation.createActorSchema.validate(ActorInfoDaoInstance);
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const insertQuery = queries.insertActor;
  const values = [
    ActorInfoDaoInstance.first_name,
    ActorInfoDaoInstance.last_name,
  ];
  const client = await pool1.connect();
  const result = await client.query(insertQuery, values);
  return result.rows[0];
}

async function actorGetQuery() {
  const getQuery = queries.gettingActor;
  const client = await pool1.connect();
  const result = await client.query(getQuery);
  return result.rows;
}

async function actorGetByIdQuery(actor_id) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [actor_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("actor id is not valid!!");
  }
  const getByIdQuery = queries.getActorById;
  const values = [actor_id];
  const result = await client.query(getByIdQuery, values);
  return result.rows[0];
}

async function actorUpdateQuery(actor_id, first_name) {
  const { error } = validation.updateActorSchema.validate({
    first_name: first_name,
  });
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [actor_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("actor id is not valid!!");
  }
  const updateQuery = queries.updateActorById;
  const values = [first_name, actor_id];
  const result = await client.query(updateQuery, values);
  return result.rows[0];
}

async function actorRemoveQuery(actor_id) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [actor_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("actor id is not valid!!");
  }
  const removeQuery = queries.removeActorById;
  const values = [actor_id];
  const result = await client.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  pool1,
  queries,
  actorCreateQuery,
  actorGetQuery,
  actorGetByIdQuery,
  actorUpdateQuery,
  actorRemoveQuery,
};
