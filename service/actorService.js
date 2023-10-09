const db = require("../connector/actorDb");

const fs = require("fs");

const csv = require("csv-parser");

const actorInfoDao = require("../pojo/ActorInfo");

async function createActor(actorInfoDaoInstance) {
  const insertActorList = await db.actorCreateQuery(actorInfoDaoInstance);
  return insertActorList;
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
  const getActorList = await db.actorGetQuery();
  return getActorList;
}

async function getActorById(actorInfoInstance) {
  const getActorListById = await db.actorGetByIdQuery(actorInfoInstance);
  return getActorListById;
}

async function updateActor(actorInfoInstance, actorInfoDaoInstance) {
  const updateActorList = await db.actorUpdateQuery(
    actorInfoInstance,
    actorInfoDaoInstance
  );
  return updateActorList;
}

async function removeActor(actorInfoInstance) {
  const removeActorList = await db.actorRemoveQuery(actorInfoInstance);
  return removeActorList;
}

module.exports = {
  createActor,
  getActor,
  getActorById,
  updateActor,
  removeActor,
  uploadActor,
};
