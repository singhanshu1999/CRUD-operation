const db = require("../connector/actorDb");

const fs = require("fs");

const csv = require("csv-parser");

const actorInfoDao = require("../pojo/ActorInfo");

async function createActor(actorInfoDaoInstance) {
  const insertedActor = await db.actorCreateQuery(actorInfoDaoInstance);
  return insertedActor;
}

async function uploadActor(actorCsvFile) {
  const multipleActor = [];
  const readActorCsv = fs.createReadStream(actorCsvFile).pipe(csv());
  for await (const row of readActorCsv) {
    const actorInfoDaoInstance = new actorInfoDao(row);
    multipleActor.push(actorInfoDaoInstance);
  }
  try {
    for (const actor of multipleActor) {
      const uploadedActor = await db.actorCreateQuery(actor);
    }
    return multipleActor;
  } catch (error) {
    console.error("Error in Upload and read csv file: ", error.message);
    return null;
  }
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
  uploadActor,
};
