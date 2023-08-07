const db = require("../connector/db");

async function createUser(first_name, last_name) {
  const insertQuery =
    " INSERT INTO actor (first_name, last_name) VALUES ($1,$2) RETURNING * ";
  const values = [first_name, last_name];
  const result = await db.query(insertQuery, values);
  return result.rows[0];
}

async function getUser() {
  const getQuery = "SELECT * FROM actor";
  const result = await db.query(getQuery);
  return result.rows;
}

async function getUserById(actor_id) {
  const checkQuery = " SELECT actor_id FROM actor WHERE actor_id=$1 ";
  const checkResult = await db.query(checkQuery, [actor_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("actor id is not valid!!");
  }
  const getByIdQuery = "SELECT * FROM actor WHERE actor_id =$1";
  const values = [actor_id];
  const result = await db.query(getByIdQuery, values);
  return result.rows[0];
}

async function updateUser(actor_id, first_name) {
  const checkQuery = " SELECT actor_id FROM actor WHERE actor_id=$1 ";
  const checkResult = await db.query(checkQuery, [actor_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("actor id is not valid!!");
  }
  const updateQuery =
    " UPDATE actor SET first_name = $1 WHERE actor_id = $2 RETURNING *";
  const values = [first_name, actor_id];
  const result = await db.query(updateQuery, values);
  return result.rows[0];
}

async function removeUser(actor_id) {
  const checkQuery = " SELECT actor_id FROM actor WHERE actor_id=$1 ";
  const checkResult = await db.query(checkQuery, [actor_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("actor id is not valid!!");
  }
  const removeQuery = " DELETE FROM actor WHERE actor_id = $1 RETURNING * ";
  const values = [actor_id];
  const result = await db.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  updateUser,
  removeUser,
};
