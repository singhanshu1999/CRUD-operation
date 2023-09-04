const db = require("../connector/actorDb");

async function createActor(actorInfoDaoInstance) {
  const insertedActor = await db.actorCreateQuery(actorInfoDaoInstance);
  return insertedActor;
}

async function getActor() {
  const gettedActor = await db.actorGetQuery();
  return gettedActor;
}

async function getActorById(actorInfoInstance) {
  const gettedActorById = await db.actorGetByIdQuery(actorInfoInstance);
  return gettedActorById;
}

async function updateActor(actorInfoInstance, actorInfoDaoInstance) {
  const updatedActor = await db.actorUpdateQuery(
    actorInfoInstance,
    actorInfoDaoInstance
  );
  return updatedActor;
}

async function removeActor(actorInfoInstance) {
  const removedActor = await db.actorRemoveQuery(actorInfoInstance);
  return removedActor;
}

module.exports = {
  createActor,
  getActor,
  getActorById,
  updateActor,
  removeActor,
};
