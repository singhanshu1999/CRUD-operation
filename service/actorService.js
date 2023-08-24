const db = require("../connector/actorDb");

async function createActor(first_name, last_name) {
  /* const insertQuery = db.queries.insertActor;
  const values = [first_name, last_name];
  const client = await db.pool1.connect();
  const result = await client.query(insertQuery, values);*/
  const insertedActor = await db.actorCreateQuery({
    first_name: first_name,
    last_name: last_name,
  });
  return insertedActor;
}

async function getActor() {
  /* const getQuery = db.queries.gettingActor;
  const client = await db.pool1.connect();
  const result = await client.query(getQuery);*/
  const gettedActor = await db.actorGetQuery();
  return gettedActor;
}

async function getActorById(actor_id) {
  /*const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [actor_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("actor id is not valid!!");
  }
  const getByIdQuery = db.queries.getActorById;
  const values = [actor_id];
  const result = await client.query(getByIdQuery, values);*/
  const gettedActorById = await db.actorGetByIdQuery(actor_id);
  return gettedActorById;
}

async function updateActor(actor_id, first_name) {
  /* const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [actor_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("actor id is not valid!!");
  }
  const updateQuery = db.queries.updateActorById;
  const values = [first_name, actor_id];
  const result = await client.query(updateQuery, values);*/
  const updatedActor = await db.actorUpdateQuery(actor_id, first_name);
  return updatedActor;
}

async function removeActor(actor_id) {
  /* const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [actor_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("actor id is not valid!!");
  }
  const removeQuery = db.queries.removeActorById;
  const values = [actor_id];
  const result = await client.query(removeQuery, values);*/
  const removedActor = await db.actorRemoveQuery(actor_id);
  return removedActor;
}

module.exports = {
  createActor,
  getActor,
  getActorById,
  updateActor,
  removeActor,
};
