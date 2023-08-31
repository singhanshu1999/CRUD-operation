const db = require("../connector/actorDb");

async function createActor(first_name, last_name) {
  const insertedActor = await db.actorCreateQuery({
    first_name,
    last_name,
  });
  return insertedActor;
}

async function getActor() {
  const gettedActor = await db.actorGetQuery();
  return gettedActor;
}

async function getActorById(actor_id) {
  const gettedActorById = await db.actorGetByIdQuery(actor_id);
  return gettedActorById;
}

async function updateActor(actor_id, first_name) {
  const updatedActor = await db.actorUpdateQuery(actor_id, first_name);
  return updatedActor;
}

async function removeActor(actor_id) {
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
