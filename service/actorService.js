const db = require("../connector/acotrDb");

async function createActor(first_name, last_name) {
  const insertQuery = db.queries.insertActor;
  const values = [first_name, last_name];
  const client = await db.pool1.connect();
  const result = await client.query(insertQuery, values);
  return result.rows[0];
}

async function getActor() {
  const getQuery = db.queries.gettingActor;
  const client = await db.pool1.connect();
  const result = await client.query(getQuery);
  return result.rows;
}

async function getActorById(actor_id) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [actor_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("actor id is not valid!!");
  }
  const getByIdQuery = db.queries.getActorById;
  const values = [actor_id];
  const result = await client.query(getByIdQuery, values);
  return result.rows[0];
}

async function updateActor(actor_id, first_name) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [actor_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("actor id is not valid!!");
  }
  const updateQuery = db.queries.updateActorById;
  const values = [first_name, actor_id];
  const result = await client.query(updateQuery, values);
  return result.rows[0];
}

async function removeActor(actor_id) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [actor_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("actor id is not valid!!");
  }
  const removeQuery = db.queries.removeActorById;
  const values = [actor_id];
  const result = await client.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  createActor,
  getActor,
  getActorById,
  updateActor,
  removeActor,
};
